/* ==========================================================
   ENGINE B · ANIME.JS v3
   Réplica das categorias nav / fundos / estado / dados /
   avançado com o movimento vindo do Anime.js (global `anime`).
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'n01', cat:'nav', title:'Hambúrguer → X',
  desc:'Três traços viram um X. Quatro variações de morph (Anime.js).',
  tags:['menu','transform','anime.js'], hint:'clique nos ícones',
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
    .n01-b i{display:block;width:20px;height:2px;background:#e8e5df;border-radius:9px}
    .n01-b.v3 i:nth-child(2){width:13px;margin-left:-7px}
    .n01-b.v4 i:nth-child(1){width:14px}
    .n01-b.v4 i:nth-child(3){width:9px}`,
  js:function(root,ctx){
    // estado "ligado" e "desligado" de cada traço, por variação
    var ON = {
      v1:[{translateY:7,rotate:45},{opacity:0},{translateY:-7,rotate:-45}],
      v2:[{translateY:7,rotate:135},{scaleX:0},{translateY:-7,rotate:-135}],
      v3:[{translateY:3.5,rotate:45},{translateY:-3.5,rotate:-45,width:20,marginLeft:0}],
      v4:[{translateY:7,rotate:-45,width:20},{opacity:0,translateX:14},{translateY:-7,rotate:45,width:20}]
    };
    var OFF = {
      v1:[{translateY:0,rotate:0},{opacity:1},{translateY:0,rotate:0}],
      v2:[{translateY:0,rotate:0},{scaleX:1},{translateY:0,rotate:0}],
      v3:[{translateY:0,rotate:0},{translateY:0,rotate:0,width:13,marginLeft:-7}],
      v4:[{translateY:0,rotate:0,width:14},{opacity:1,translateX:0},{translateY:0,rotate:0,width:9}]
    };
    root.querySelectorAll('.n01-b').forEach(function(b){
      var v = b.className.match(/v\d/)[0],
          bars = b.querySelectorAll('i');
      ctx.on(b,'click',function(){
        var on = b.classList.toggle('on');
        (on ? ON : OFF)[v].forEach(function(spec,i){
          var p = { targets:bars[i], duration:420, easing:'easeOutQuint' };
          for (var k in spec) p[k] = spec[k];
          anime.remove(bars[i]);
          anime(p);
        });
      });
      ctx.clean(function(){ anime.remove(bars); });
    });
  }
},

{
  id:'n02', cat:'nav', title:'Menu fullscreen com stagger',
  desc:'O painel entra por clip-path e os links sobem em cascata (Anime.js).',
  tags:['overlay','stagger','anime.js'], hint:'clique no menu',
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
    .n02-t i{width:20px;height:2px;background:#fff;border-radius:9px;mix-blend-mode:difference}
    .n02-p{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:2px;
      padding:0 22px;background:linear-gradient(140deg,#d4af37,#b08ac9);
      clip-path:circle(0% at calc(100% - 32px) 32px)}
    .n02-p a{font-size:24px;font-weight:800;letter-spacing:-.035em;color:#1b1813;cursor:pointer;
      opacity:0;transform:translateY(24px)}`,
  js:function(root,ctx){
    var panel = root.querySelector('.n02-p'),
        links = root.querySelectorAll('.n02-p a'),
        bars  = root.querySelectorAll('.n02-t i'),
        clip  = { r:0 }, on = false;
    function draw(){ panel.style.clipPath = 'circle(' + clip.r + '% at calc(100% - 32px) 32px)'; }
    ctx.on(root.querySelector('.n02-t'),'click',function(){
      on = !on;
      anime.remove(clip); anime.remove(links); anime.remove(bars);
      anime({ targets:clip, r:on ? 150 : 0, duration:700, easing:'easeInOutQuart', update:draw });
      anime({ targets:bars[0], translateY:on ? 4 : 0, rotate:on ? 45 : 0, duration:400, easing:'easeOutQuint' });
      anime({ targets:bars[1], translateY:on ? -4 : 0, rotate:on ? -45 : 0, duration:400, easing:'easeOutQuint' });
      anime({
        targets:links,
        opacity:on ? 1 : 0, translateY:on ? 0 : 24,
        duration:500, easing:'easeOutQuint',
        delay:on ? anime.stagger(70, { start:200 }) : 0
      });
    });
    ctx.clean(function(){ anime.remove(clip); anime.remove(links); anime.remove(bars); });
  }
},

{
  id:'n03', cat:'nav', title:'Drawer lateral com backdrop',
  desc:'Painel desliza, fundo escurece e desfoca, scroll travado (Anime.js).',
  tags:['drawer','backdrop-filter','anime.js'], hint:'clique em abrir',
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
      backdrop-filter:blur(3px)}
    .n03-d{position:absolute;top:0;right:0;bottom:0;width:190px;padding:20px;background:#1b1915;
      border-left:1px solid #2a2620;display:flex;flex-direction:column;gap:12px;
      transform:translateX(100%);box-shadow:-20px 0 60px -30px #000}
    .n03-d b{font-size:14px;color:#f4f1eb}
    .n03-d label{display:flex;gap:8px;align-items:center;font-size:12.5px;color:#a5a099;
      opacity:0;transform:translateX(16px)}
    .n03-c{margin-top:auto;background:#2b2721;color:#e8e5df}`,
  js:function(root,ctx){
    var sh = root.querySelector('.n03-sh'),
        dr = root.querySelector('.n03-d'),
        labels = root.querySelectorAll('.n03-d label');
    function set(on){
      sh.style.pointerEvents = on ? 'auto' : 'none';
      anime.remove(sh); anime.remove(dr); anime.remove(labels);
      anime({ targets:sh, opacity:on ? 1 : 0, duration:400, easing:'linear' });
      anime({ targets:dr, translateX:on ? '0%' : '100%', duration:480, easing:'easeOutQuint' });
      anime({
        targets:labels, opacity:on ? 1 : 0, translateX:on ? 0 : 16,
        duration:400, easing:'easeOutQuint',
        delay:on ? anime.stagger(60, { start:140 }) : 0
      });
    }
    ctx.on(root.querySelector('.n03-o'),'click',function(){ set(true); });
    ctx.on(root.querySelector('.n03-c'),'click',function(){ set(false); });
    ctx.on(sh,'click',function(){ set(false); });
    ctx.clean(function(){ anime.remove(sh); anime.remove(dr); anime.remove(labels); });
  }
},

{
  id:'n04', cat:'nav', title:'Mega-menu',
  desc:'Abre com altura animada e os itens entram escalonados. Fecha com delay (Anime.js).',
  tags:['dropdown','stagger','anime.js'], hint:'passe o mouse',
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
      max-height:0;opacity:0;overflow:hidden}
    .n04-col b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#d4af37;margin-bottom:8px}
    .n04-col span{display:block;font-size:13px;color:#c6c1b6;padding:4px 0;cursor:pointer;
      opacity:0;transform:translateY(8px)}
    .n04-col span:hover{color:#fff}`,
  js:function(root,ctx){
    var box = root.querySelector('.n04'),
        menu = root.querySelector('.n04-m'),
        items = root.querySelectorAll('.n04-col span'), t;
    function set(on){
      anime.remove(menu); anime.remove(items);
      anime({
        targets:menu,
        maxHeight:on ? 180 : 0, opacity:on ? 1 : 0,
        paddingTop:on ? 18 : 0, paddingBottom:on ? 18 : 0,
        duration:450, easing:'easeOutQuint'
      });
      anime({
        targets:items, opacity:on ? 1 : 0, translateY:on ? 0 : 8,
        duration:400, easing:'easeOutQuint',
        delay:on ? anime.stagger(60) : 0
      });
    }
    ctx.on(root.querySelector('.n04-tr'),'mouseenter',function(){ clearTimeout(t); set(true); });
    ctx.on(box,'mouseleave',function(){ t = ctx.wait(function(){ set(false); }, 220); });
    ctx.on(menu,'mouseenter',function(){ clearTimeout(t); });
    ctx.clean(function(){ anime.remove(menu); anime.remove(items); });
  }
},

{
  id:'n05', cat:'nav', title:'Tabs com indicador deslizante',
  desc:'O indicador mede a posição do botão ativo — nada de larguras fixas (Anime.js).',
  tags:['tabs','FLIP','anime.js'], hint:'clique nas abas',
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
    .n05-ind{position:absolute;top:4px;bottom:4px;left:0;width:0;border-radius:8px;background:#2c2820}
    .n05-t button{position:relative;z-index:2;padding:7px 11px;font-size:11.5px;color:#8f8a80;
      border-radius:8px;transition:color .25s;white-space:nowrap}
    .n05-t button.on{color:#f5f2ec}
    .n05-body{margin-top:14px;padding:14px;border-radius:11px;background:#181611;border:1px solid #23201a}
    .n05-body b{font-size:13.5px;color:#eee}
    .n05-body p{font-size:12px;color:#85807a;margin-top:4px}`,
  js:function(root,ctx){
    var ind = root.querySelector('.n05-ind'),
        btns = root.querySelectorAll('.n05-t button'),
        body = root.querySelector('.n05-body'),
        texts = ['O conteúdo troca com um fade curto.','Sessões, cliques e retenção.',
                 'Quem faz o quê, e desde quando.','Chaves, limites e webhooks.'];
    function move(b, instant){
      anime.remove(ind);
      if (instant){ anime.set(ind, { width:b.offsetWidth, translateX:b.offsetLeft }); return; }
      anime({ targets:ind, width:b.offsetWidth, translateX:b.offsetLeft, duration:420, easing:'easeOutQuint' });
    }
    move(root.querySelector('.n05-t button.on'), true);
    btns.forEach(function(b,i){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        move(b);
        body.innerHTML = '<b>' + b.textContent + '</b><p>' + texts[i] + '</p>';
        anime.remove(body);
        anime({ targets:body, opacity:[0,1], translateY:[6,0], duration:350, easing:'easeOutQuint' });
      });
    });
    ctx.clean(function(){ anime.remove(ind); anime.remove(body); });
  }
},

{
  id:'n06', cat:'nav', title:'Accordion com altura medida',
  desc:'Anime.js mede o conteúdo e anima a altura real de cada item.',
  tags:['accordion','height','anime.js'], hint:'clique nos itens',
  html:`
    <div class="n06">
      <div class="n06-i open"><button>Como funciona o teste grátis?<i></i></button><div class="n06-c"><p>14 dias, sem cartão. No fim escolhe um plano ou a conta vira somente-leitura.</p></div></div>
      <div class="n06-i"><button>Posso cancelar quando quiser?<i></i></button><div class="n06-c"><p>Sim. O cancelamento vale até o fim do ciclo já pago.</p></div></div>
      <div class="n06-i"><button>Vocês emitem nota fiscal?<i></i></button><div class="n06-c"><p>Emitimos NF-e automaticamente todo dia 1º.</p></div></div>
    </div>`,
  css:`
    .n06{width:250px;display:flex;flex-direction:column;gap:8px}
    .n06-i{border-radius:11px;background:#191712;overflow:hidden;border:1px solid #24211a}
    .n06-i button{width:100%;display:flex;align-items:center;gap:10px;padding:13px 14px;
      font-size:12.5px;color:#e8e5df;text-align:left}
    .n06-i i{margin-left:auto;width:11px;height:11px;position:relative;flex:none}
    .n06-i i::before,.n06-i i::after{content:"";position:absolute;background:#d4af37;border-radius:9px}
    .n06-i i::before{left:0;right:0;top:5px;height:1.6px}
    .n06-i i::after{top:0;bottom:0;left:5px;width:1.6px;transform:scaleY(var(--sy,1))}
    .n06-c{height:0;overflow:hidden}
    .n06-c p{margin:0;padding:0 14px 13px;font-size:11.5px;line-height:1.6;color:#8a857c}`,
  js:function(root,ctx){
    var items = root.querySelectorAll('.n06-i');
    function set(it, open, instant){
      var c = it.querySelector('.n06-c'),
          ic = it.querySelector('i'),
          hh = c.firstElementChild.scrollHeight;
      it.classList.toggle('open', open);
      ic.style.setProperty('--sy', open ? 0 : 1);      // o "+" vira "−"
      anime.remove(c); anime.remove(ic);
      if (instant){ anime.set(c, { height:open ? hh : 0 }); return; }
      anime({ targets:c, height:open ? hh : 0, duration:450, easing:'easeOutQuint' });
      anime({ targets:ic, rotate:open ? 180 : 0, duration:400, easing:'easeOutQuint' });
    }
    items.forEach(function(it){
      set(it, it.classList.contains('open'), true);
      ctx.on(it.querySelector('button'),'click',function(){
        var was = it.classList.contains('open');
        items.forEach(function(x){ if (x !== it) set(x, false); });
        set(it, !was);
      });
      ctx.clean(function(){ anime.remove(it.querySelector('.n06-c')); anime.remove(it.querySelector('i')); });
    });
  }
},

{
  id:'n07', cat:'nav', title:'Modal com scale + backdrop',
  desc:'Entrada com mola, saída rápida. Fecha no ESC e no clique fora (Anime.js).',
  tags:['modal','spring','anime.js'], hint:'clique para abrir',
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
    .n07-bd{position:absolute;inset:0;background:rgba(4,4,8,.65);opacity:0}
    .n07-m{position:relative;width:230px;padding:20px;border-radius:14px;background:#181820;border:1px solid #2e2a22;
      opacity:0;transform:scale(.9) translateY(10px)}
    .n07-m b{font-size:15px;color:#f5f2ec}
    .n07-m p{font-size:12px;color:#8a857c;margin-top:6px;line-height:1.55}
    .n07-a{display:flex;gap:8px;margin-top:16px;justify-content:flex-end}
    .n07-a button{padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600}
    .n07-a .c{background:#2b2721;color:#e8e5df}
    .n07-a .d{background:#e5645f;color:#2a0710}`,
  js:function(root,ctx){
    var w = root.querySelector('.n07-w'),
        bd = root.querySelector('.n07-bd'),
        m = root.querySelector('.n07-m');
    function open(){
      w.style.pointerEvents = 'auto';
      anime.remove(bd); anime.remove(m);
      anime({ targets:bd, opacity:1, duration:300, easing:'linear' });
      anime({ targets:m, opacity:1, scale:1, translateY:0, duration:450, easing:'easeOutBack' });
    }
    function close(){
      w.style.pointerEvents = 'none';
      anime.remove(bd); anime.remove(m);
      anime({ targets:bd, opacity:0, duration:250, easing:'linear' });
      anime({ targets:m, opacity:0, scale:.9, translateY:10, duration:250, easing:'easeInQuad' });
    }
    ctx.on(root.querySelector('.n07-o'),'click',open);
    ctx.on(bd,'click',close);
    ctx.on(root.querySelector('.n07-a .c'),'click',close);
    ctx.on(root.querySelector('.n07-a .d'),'click',close);
    ctx.on(document,'keydown',function(e){ if (e.key === 'Escape') close(); });
    ctx.clean(function(){ anime.remove(bd); anime.remove(m); });
  }
},

{
  id:'n08', cat:'nav', title:'Toasts empilhando',
  desc:'Entram pela direita, empurram os anteriores e saem sozinhos (Anime.js).',
  tags:['toast','stack','anime.js'], hint:'clique para disparar',
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
      background:#211e18;border:1px solid #332e21;font-size:12px;color:#e9e5dc;white-space:nowrap}
    .n08-t s{width:7px;height:7px;border-radius:50%;text-decoration:none}`,
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
      if (st.children.length > 3){ anime.remove(st.firstChild); st.firstChild.remove(); }
      anime({ targets:t, translateX:[90,0], scale:[.9,1], opacity:[0,1], duration:450, easing:'easeOutBack' });
      ctx.wait(function(){
        anime.remove(t);
        anime({
          targets:t, translateX:60, scale:.95, opacity:0,
          duration:300, easing:'easeInQuad',
          complete:function(){ t.remove(); }
        });
      }, 2600);
    });
    ctx.clean(function(){
      Array.prototype.forEach.call(st.children, function(t){ anime.remove(t); });
    });
  }
},

{
  id:'n09', cat:'nav', title:'Bottom nav com bolha',
  desc:'O ícone ativo sobe, a bolha desliza e o rótulo aparece (Anime.js).',
  tags:['mobile','indicator','anime.js'], hint:'clique nos ícones',
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
      background:#1a1814;border:1px solid #242119}
    .n09-bub{position:absolute;top:8px;left:0;width:52px;height:44px;border-radius:13px;
      background:linear-gradient(140deg,#d4af3722,#b08ac922);border:1px solid #d4af3744}
    .n09-bar button{position:relative;z-index:2;width:52px;height:44px;display:grid;place-items:center;gap:0;
      color:#736f68;transition:color .3s}
    .n09-bar button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;
      stroke-linecap:round;stroke-linejoin:round}
    .n09-bar button b{position:absolute;bottom:1px;font-size:8.5px;font-weight:600;opacity:0;
      transform:translateY(6px)}
    .n09-bar button.on{color:#d4af37}`,
  js:function(root,ctx){
    var bub = root.querySelector('.n09-bub'),
        btns = root.querySelectorAll('.n09-bar button');
    function state(b, on, instant){
      var svg = b.querySelector('svg'), lbl = b.querySelector('b');
      anime.remove(svg); anime.remove(lbl);
      if (instant){
        anime.set(svg, { translateY:on ? -6 : 0, scale:on ? 1.05 : 1 });
        anime.set(lbl, { opacity:on ? 1 : 0, translateY:on ? 0 : 6 });
        return;
      }
      anime({ targets:svg, translateY:on ? -6 : 0, scale:on ? 1.05 : 1, duration:450, easing:'easeOutBack' });
      anime({ targets:lbl, opacity:on ? 1 : 0, translateY:on ? 0 : 6, duration:300, easing:'easeOutQuad' });
    }
    anime.set(bub, { translateX:btns[0].offsetLeft });
    state(btns[0], true, true);
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){
          if (x.classList.contains('on') && x !== b) state(x, false);
          x.classList.remove('on');
        });
        b.classList.add('on');
        state(b, true);
        anime.remove(bub);
        anime({ targets:bub, translateX:b.offsetLeft, duration:500, easing:'easeOutElastic(1, .75)' });
      });
    });
    ctx.clean(function(){
      anime.remove(bub);
      btns.forEach(function(b){ anime.remove(b.querySelector('svg')); anime.remove(b.querySelector('b')); });
    });
  }
},

{
  id:'n10', cat:'nav', title:'Dropdown com origem correta',
  desc:'transform-origin no canto do gatilho + itens em cascata (Anime.js).',
  tags:['dropdown','transform-origin','anime.js'], hint:'clique no botão',
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
    .n10-t i{font-style:normal;color:#d4af37}
    .n10-m{position:absolute;top:calc(100% + 8px);left:0;width:150px;margin:0;padding:6px;list-style:none;
      background:#1c1a15;border:1px solid #2d2921;border-radius:11px;box-shadow:0 20px 50px -25px #000;
      transform-origin:0 0;transform:scale(.86) translateY(-6px);opacity:0;pointer-events:none}
    .n10-m li{padding:7px 10px;border-radius:7px;font-size:12px;color:#a19c92;cursor:pointer;
      opacity:0;transform:translateY(-5px);transition:background .15s}
    .n10-m li:hover{background:#22201a;color:#fff}`,
  js:function(root,ctx){
    var box = root.querySelector('.n10'),
        menu = root.querySelector('.n10-m'),
        arrow = root.querySelector('.n10-t i'),
        lis = root.querySelectorAll('.n10-m li'),
        on = false;
    function set(v){
      if (on === v) return;
      on = v;
      menu.style.pointerEvents = v ? 'auto' : 'none';
      anime.remove(menu); anime.remove(arrow); anime.remove(lis);
      anime({ targets:menu, opacity:v ? 1 : 0, scale:v ? 1 : .86, translateY:v ? 0 : -6,
              duration:380, easing:v ? 'easeOutBack' : 'easeOutQuad' });
      anime({ targets:arrow, rotate:v ? 180 : 0, duration:350, easing:'easeOutQuint' });
      anime({ targets:lis, opacity:v ? 1 : 0, translateY:v ? 0 : -5,
              duration:300, easing:'easeOutQuint', delay:v ? anime.stagger(40, { start:50 }) : 0 });
    }
    ctx.on(root.querySelector('.n10-t'),'click',function(e){
      e.stopPropagation(); set(!on);
    });
    ctx.on(document,'click',function(){ set(false); });
    lis.forEach(function(li){
      ctx.on(li,'click',function(){
        root.querySelector('.n10-t').firstChild.nodeValue = li.textContent + ' ';
        set(false);
      });
    });
    ctx.clean(function(){ anime.remove(menu); anime.remove(arrow); anime.remove(lis); });
  }
},

{
  id:'n11', cat:'nav', title:'Carrossel com drag e inércia',
  desc:'Pointer events + atrito + snap no slide mais próximo. Dots via Anime.js.',
  tags:['drag','inertia','anime.js'], hint:'arraste ←→',
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
      border:1px solid #ffffff12;user-select:none}
    .n11-dots{display:flex;gap:6px;justify-content:center}
    .n11-dots i{width:6px;height:6px;border-radius:9px;background:#302c24}
    .n11-dots i.on{background:#d4af37}`,
  js:function(root,ctx){
    var box = root.querySelector('.n11'),
        tr = root.querySelector('.n11-tr'),
        dots = root.querySelectorAll('.n11-dots i'),
        W = 152;                                   // largura do slide + gap
    var x = 0, target = 0, down = false, sx = 0, sxa = 0, vel = 0, last = 0, max, lastIdx = 0;
    anime.set(dots[0], { width:18 });
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
      if (idx !== lastIdx){
        anime.remove(dots);
        anime({ targets:dots[lastIdx], width:6, backgroundColor:'#302c24', duration:350, easing:'easeOutQuint' });
        anime({ targets:dots[idx], width:18, backgroundColor:'#d4af37', duration:350, easing:'easeOutQuint' });
        dots.forEach(function(d,i){ d.classList.toggle('on', i === idx); });
        lastIdx = idx;
      }
    });
    ctx.clean(function(){ anime.remove(dots); });
  }
},

{
  id:'f01', cat:'fundos', title:'Mesh gradient animado',
  desc:'Quatro radiais coloridas em blur, cada uma com seu ciclo (Anime.js).',
  tags:['radial-gradient','blur','anime.js'], stage:'flush',
  html:`<div class="f01"><i></i><i></i><i></i><i></i><b>mesh</b></div>`,
  css:`
    .f01{position:relative;width:100%;height:100%;overflow:hidden;background:#0d0c0b;display:grid;place-items:center}
    .f01 i{position:absolute;width:230px;height:230px;border-radius:50%;filter:blur(58px);opacity:.75;
      mix-blend-mode:screen}
    .f01 i:nth-child(1){background:#d4af37;top:-70px;left:-50px}
    .f01 i:nth-child(2){background:#b08ac9;bottom:-90px;right:-40px}
    .f01 i:nth-child(3){background:#cf9b6a;top:30px;right:-70px}
    .f01 i:nth-child(4){background:#5cc88f;bottom:-40px;left:-20px}
    .f01 b{position:relative;z-index:2;font-size:26px;font-weight:800;letter-spacing:.3em;color:#0b0b14;
      mix-blend-mode:overlay}`,
  js:function(root,ctx){
    var blobs = root.querySelectorAll('.f01 i');
    var spec = [
      { translateX:90,  translateY:70,  scale:1.25, duration:9000 },
      { translateX:-70, translateY:-60, scale:1.15, duration:11000 },
      { translateX:-90, translateY:90,  scale:.85,  duration:13000 },
      { translateX:80,  translateY:-70, scale:1.2,  duration:10000 }
    ];
    spec.forEach(function(s,i){
      anime({
        targets:blobs[i],
        translateX:s.translateX, translateY:s.translateY, scale:s.scale,
        duration:s.duration, direction:'alternate', loop:true, easing:'easeInOutSine'
      });
    });
    ctx.clean(function(){ anime.remove(blobs); });
  }
},

{
  id:'f02', cat:'fundos', title:'Blobs orgânicos',
  desc:'border-radius de 8 valores animado — parece morph de SVG e custa menos (Anime.js).',
  tags:['border-radius','morph','anime.js'],
  html:`<div class="f02"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>`,
  css:`
    .f02{position:relative;width:200px;height:200px;display:grid;place-items:center}
    .f02 i{position:absolute;width:150px;height:150px;mix-blend-mode:screen;
      border-radius:62% 38% 46% 54%/54% 46% 62% 38%}
    .f02 .b1{background:linear-gradient(140deg,#d4af37,#b8871f)}
    .f02 .b2{background:linear-gradient(140deg,#b08ac9,#6f4f86)}
    .f02 .b3{background:linear-gradient(140deg,#5cc88f,#2f7d55)}`,
  js:function(root,ctx){
    var states = [];
    function blob(sel, scale, phase){
      var el = root.querySelector(sel);
      var s = { a:62,b:38,c:46,d:54,e:54,f:46,g:62,h:38, rot:0 };
      function draw(){
        el.style.borderRadius = s.a+'% '+s.b+'% '+s.c+'% '+s.d+'%/'+s.e+'% '+s.f+'% '+s.g+'% '+s.h+'%';
        el.style.transform = 'scale(' + scale + ') rotate(' + s.rot + 'deg)';
      }
      var inst = anime({
        targets:s,
        keyframes:[
          { a:38,b:62,c:63,d:37,e:41,f:64,g:36,h:59, rot:120 },
          { a:55,b:45,c:32,d:68,e:70,f:33,g:67,h:30, rot:240 },
          { a:62,b:38,c:46,d:54,e:54,f:46,g:62,h:38, rot:360 }
        ],
        duration:8000, easing:'easeInOutSine', loop:true, update:draw
      });
      inst.seek(phase);                          // simula o animation-delay negativo
      draw();
      states.push(s);
    }
    blob('.b1', 1, 0);
    blob('.b2', .85, 2600);
    blob('.b3', .7, 5200);
    ctx.clean(function(){ states.forEach(function(s){ anime.remove(s); }); });
  }
},

{
  id:'f03', cat:'fundos', title:'Constelação de partículas',
  desc:'Pontos ligados por linhas quando estão perto; o mouse os empurra. (desenho por frame)',
  tags:['canvas','particles','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f03"></canvas>`,
  css:`.f03{width:100%;height:100%;display:block;background:#0a0908}`,
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
  desc:'Cada ponto cresce e é atraído pelo cursor. Padrão de fundo "vivo". (desenho por frame)',
  tags:['canvas','grid','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f04"></canvas>`,
  css:`.f04{width:100%;height:100%;display:block;background:#0d0c0b}`,
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
  desc:'Faixas em blur pesado com rotação lenta e blend screen (Anime.js).',
  tags:['blur','blend-mode','anime.js'], stage:'flush',
  html:`<div class="f05"><i></i><i></i><i></i><span>aurora</span></div>`,
  css:`
    .f05{position:relative;width:100%;height:100%;overflow:hidden;background:#070605;display:grid;place-items:center}
    .f05 i{position:absolute;left:-40%;right:-40%;height:120px;filter:blur(42px);opacity:.6;mix-blend-mode:screen;
      border-radius:50%}
    .f05 i:nth-child(1){top:20px;background:linear-gradient(90deg,transparent,#5cc88f,#b8871f,transparent)}
    .f05 i:nth-child(2){top:80px;background:linear-gradient(90deg,transparent,#b08ac9,#cf9b6a,transparent)}
    .f05 i:nth-child(3){top:140px;background:linear-gradient(90deg,transparent,#d4af37,#8a6fb0,transparent)}
    .f05 span{position:relative;z-index:2;font-family:var(--mono);font-size:11px;letter-spacing:.4em;
      text-transform:uppercase;color:#ddd6c499}`,
  js:function(root,ctx){
    var bands = root.querySelectorAll('.f05 i');
    var spec = [
      { translateY:24,  rotate:-6, scaleY:1.5, duration:8000 },
      { translateY:-30, rotate:5,  scaleY:1.8, duration:11000 },
      { translateY:-50, rotate:-4, scaleY:1.3, duration:9000 }
    ];
    spec.forEach(function(s,i){
      anime({
        targets:bands[i],
        translateY:s.translateY, rotate:s.rotate, scaleY:s.scaleY,
        duration:s.duration, direction:'alternate', loop:true, easing:'easeInOutSine'
      });
    });
    ctx.clean(function(){ anime.remove(bands); });
  }
},

{
  id:'f06', cat:'fundos', title:'Grain / ruído de filme',
  desc:'Ruído gerado em canvas e reciclado a ~12fps — textura analógica.',
  tags:['canvas','noise','anime.js'], stage:'flush',
  html:`
    <div class="f06">
      <div class="f06-bg"><b>GRAIN</b></div>
      <canvas class="f06-n"></canvas>
    </div>`,
  css:`
    .f06{position:relative;width:100%;height:100%;overflow:hidden}
    .f06-bg{position:absolute;inset:0;display:grid;place-items:center;
      background:linear-gradient(140deg,#3c3050,#221d13 60%,#0d0c0b)}
    .f06-bg b{font-size:28px;font-weight:800;letter-spacing:.28em;color:#ffffff22}
    .f06-n{position:absolute;inset:0;width:100%;height:100%;opacity:.42;mix-blend-mode:overlay;pointer-events:none}`,
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
  desc:'Três paths em fase diferente, animados pelo Anime.js em loop alternado.',
  tags:['SVG','wave','anime.js'], stage:'flush',
  html:`
    <div class="f07">
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path class="w1" d="M0,120 C150,80 350,160 600,120 C850,80 1050,160 1200,120 L1200,200 L0,200Z"/>
        <path class="w2" d="M0,140 C200,100 400,180 600,140 C800,100 1000,180 1200,140 L1200,200 L0,200Z"/>
        <path class="w3" d="M0,160 C180,130 380,190 600,160 C820,130 1020,190 1200,160 L1200,200 L0,200Z"/>
      </svg>
      <b>ondas</b>
    </div>`,
  css:`
    .f07{position:relative;width:100%;height:100%;overflow:hidden;
      background:linear-gradient(#171410,#201c13)}
    .f07 svg{position:absolute;bottom:0;left:0;width:200%;height:130px}
    .f07 path{transform-origin:0 0}
    .f07 .w1{fill:#3a3320}
    .f07 .w2{fill:#4a4028;opacity:.75}
    .f07 .w3{fill:#6b5a35;opacity:.6}
    .f07 b{position:absolute;top:34px;left:0;right:0;text-align:center;font-size:11px;font-family:var(--mono);
      letter-spacing:.4em;text-transform:uppercase;color:#d4af3799}`,
  js:function(root,ctx){
    var waves = [
      { el:root.querySelector('.w1'), d:7000, rev:false },
      { el:root.querySelector('.w2'), d:5000, rev:true },
      { el:root.querySelector('.w3'), d:9000, rev:false }
    ];
    waves.forEach(function(w){
      var inst = anime({
        targets:w.el,
        translateX:'-14%', scaleY:1.18,
        duration:w.d, direction:'alternate', loop:true, easing:'easeInOutSine'
      });
      if (w.rev) inst.seek(w.d);                 // equivale ao alternate-reverse
    });
    ctx.clean(function(){ waves.forEach(function(w){ anime.remove(w.el); }); });
  }
},

{
  id:'f08', cat:'fundos', title:'Starfield / hiperespaço',
  desc:'Projeção em perspectiva: as estrelas aceleram do centro para fora. Velocidade via Anime.js.',
  tags:['canvas','3D','anime.js'], stage:'flush', hint:'mova o mouse p/ acelerar',
  html:`<canvas class="f08"></canvas>`,
  css:`.f08{width:100%;height:100%;display:block;background:#060504;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f08'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var N = 220, S = [], spd = { v:1.2 };
    for (var i = 0; i < N; i++) S.push(reset({}));
    function reset(s){
      s.x = (Math.random()-.5) * w * 1.6;
      s.y = (Math.random()-.5) * h * 1.6;
      s.z = Math.random() * w;
      s.pz = s.z;
      return s;
    }
    function go(v){
      anime.remove(spd);
      anime({ targets:spd, v:v, duration:900, easing:'easeOutQuad' });
    }
    ctx.on(cv,'mouseenter',function(){ go(9); });
    ctx.on(cv,'mouseleave',function(){ go(1.2); });
    ctx.loop(function(){
      c.fillStyle = 'rgba(6,5,4,.35)';
      c.fillRect(0,0,w,h);
      c.save(); c.translate(w/2, h/2);
      S.forEach(function(s){
        s.pz = s.z; s.z -= spd.v * 6;
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
    ctx.clean(function(){ anime.remove(spd); });
  }
},

{
  id:'f09', cat:'fundos', title:'Ondas de água no clique',
  desc:'Ripples concêntricos com decaimento — cada clique gera uma nova. Tween das ondas via Anime.js.',
  tags:['canvas','ripple','anime.js'], stage:'flush', hint:'clique no quadro',
  html:`<canvas class="f09"></canvas>`,
  css:`.f09{width:100%;height:100%;display:block;background:radial-gradient(60% 70% at 50% 40%,#201c12,#0a0908);cursor:pointer}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var R = [];
    function add(x,y){
      var o = { x:x, y:y, r:0, a:1 };
      R.push(o);
      if (R.length > 14){ anime.remove(R[0]); R.shift(); }
      anime({ targets:o, r:230, a:0, duration:3800, easing:'easeOutSine' });
    }
    ctx.on(cv,'pointerdown',function(e){
      var b = cv.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
    });
    ctx.every(function(){ add(Math.random()*w, Math.random()*h); }, 1600);
    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      R.forEach(function(o){
        for (var k = 0; k < 3; k++){
          var rr = o.r - k*13;
          if (rr <= 0) continue;
          c.strokeStyle = 'rgba(212,175,55,' + (o.a * (1 - k*.3) * .8) + ')';
          c.lineWidth = 1.4 - k*.35;
          c.beginPath(); c.arc(o.x, o.y, rr, 0, 6.284); c.stroke();
        }
      });
      R = R.filter(function(o){
        if (o.a > .04) return true;
        anime.remove(o);
        return false;
      });
    });
    ctx.clean(function(){ R.forEach(function(o){ anime.remove(o); }); });
  }
},

{
  id:'f10', cat:'fundos', title:'Spotlight da seção',
  desc:'Uma máscara radial revela o conteúdo só onde o cursor está.',
  tags:['mask','radial-gradient','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="f10">
      <div class="f10-base">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
      <div class="f10-lit">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
    </div>`,
  css:`
    .f10{position:relative;width:100%;height:100%;overflow:hidden;background:#0d0c0b}
    .f10-base,.f10-lit{position:absolute;inset:0;display:grid;grid-template-columns:repeat(2,1fr);
      align-content:center;gap:14px;padding:26px;font-size:19px;font-weight:800;letter-spacing:-.02em}
    .f10-base{color:#201d17}
    .f10-lit{color:#d4af37;
      -webkit-mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%);
      mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%)}`,
  js:function(root,ctx){
    var box = root.querySelector('.f10'), lit = root.querySelector('.f10-lit');
    var pos = { x:-999, y:-999 };
    function draw(){
      lit.style.setProperty('--x', pos.x + 'px');
      lit.style.setProperty('--y', pos.y + 'px');
    }
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      anime.remove(pos);
      anime({
        targets:pos, x:e.clientX - r.left, y:e.clientY - r.top,
        duration:120, easing:'linear', update:draw
      });
    });
    ctx.on(box,'mouseleave',function(){ anime.remove(pos); pos.x = -999; draw(); });
    ctx.clean(function(){ anime.remove(pos); });
  }
},

{
  id:'x01', cat:'estado', title:'Botão: enviar → carregando → ok',
  desc:'Três estados numa largura que se ajusta. Tudo orquestrado pelo Anime.js.',
  tags:['loading','state machine','anime.js'], hint:'clique',
  html:`
    <button class="x01">
      <span class="t">Enviar pedido</span>
      <span class="sp"></span>
      <svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
    </button>`,
  css:`
    .x01{position:relative;display:grid;place-items:center;height:46px;width:170px;border-radius:12px;
      background:#d4af37;color:#1b1813;font-size:13.5px;font-weight:700;overflow:hidden}
    .x01>*{grid-area:1/1}
    .x01 .sp,.x01 .ck{opacity:0;transform:scale(.6)}
    .x01 .sp{width:20px;height:20px;border:2.5px solid rgba(7,18,28,.25);border-top-color:#1b1813;
      border-radius:50%}
    .x01 .ck{width:24px;height:24px;fill:none;stroke:#052e22;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .x01 .ck path{stroke-dasharray:26;stroke-dashoffset:26}`,
  js:function(root,ctx){
    var b = root.querySelector('.x01'),
        t = b.querySelector('.t'),
        sp = b.querySelector('.sp'),
        ck = b.querySelector('.ck'),
        path = ck.querySelector('path'),
        busy = false, spin = null;
    var all = [b, t, sp, ck, path];
    ctx.on(b,'click',function(){
      if (busy) return;
      busy = true;
      anime({ targets:b, width:46, borderRadius:23, duration:450, easing:'easeOutQuint' });
      anime({ targets:t, opacity:0, scale:.8, duration:250, easing:'easeOutQuad' });
      anime({ targets:sp, opacity:1, scale:1, duration:350, delay:120, easing:'easeOutBack' });
      spin = anime({ targets:sp, rotate:'+=360', duration:700, easing:'linear', loop:true });
      ctx.wait(function(){
        spin.pause(); anime.remove(sp);
        anime.set(sp, { opacity:0 });
        anime({ targets:b, backgroundColor:'#5cc88f', duration:350, easing:'linear' });
        anime({ targets:ck, opacity:1, scale:1, duration:350, easing:'easeOutBack' });
        anime({ targets:path, strokeDashoffset:[26,0], duration:450, delay:100, easing:'easeInOutQuart' });
        ctx.wait(function(){                     // volta ao estado inicial
          all.forEach(function(el){ anime.remove(el); });
          anime({ targets:b, width:170, borderRadius:12, backgroundColor:'#d4af37', duration:450, easing:'easeOutQuint' });
          anime({ targets:t, opacity:1, scale:1, duration:300, delay:150, easing:'easeOutQuad' });
          anime.set(ck, { opacity:0, scale:.6 });
          anime.set(sp, { opacity:0, scale:.6, rotate:0 });
          anime.set(path, { strokeDashoffset:26 });
          busy = false;
        }, 2200);
      }, 1600);
    });
    ctx.clean(function(){
      if (spin) spin.pause();
      all.forEach(function(el){ anime.remove(el); });
    });
  }
},

{
  id:'x02', cat:'estado', title:'Shake de erro',
  desc:'Sacudida curta e assimétrica + borda vermelha. Nunca passe de 400ms (Anime.js).',
  tags:['error','shake','anime.js'], hint:'clique em entrar',
  html:`
    <form class="x02" onsubmit="return false">
      <div class="x02-f"><input placeholder="e-mail" value="raffa@"><small>e-mail inválido</small></div>
      <div class="x02-f"><input type="password" autocomplete="current-password" placeholder="senha" value="123"><small>mínimo 8 caracteres</small></div>
      <button>Entrar</button>
    </form>`,
  css:`
    .x02{width:220px;display:flex;flex-direction:column;gap:12px}
    .x02-f{position:relative}
    .x02 input{width:100%;padding:11px 13px;border-radius:10px;background:#1a1814;border:1px solid #2b2721;
      color:#efece6;font-size:13px;outline:0;transition:border-color .25s,background .25s}
    .x02 input:focus{border-color:#d4af37}
    .x02-f small{position:absolute;left:2px;top:calc(100% + 3px);font-size:10.5px;color:#e5645f;
      opacity:0;transform:translateY(-4px)}
    .x02-f.bad input{border-color:#e5645f;background:#1d1216}
    .x02 button{padding:11px;border-radius:10px;background:#d4af37;color:#1b1813;font-weight:700;font-size:13px;margin-top:4px}`,
  js:function(root,ctx){
    var fs = root.querySelectorAll('.x02-f');
    ctx.on(root.querySelector('button'),'click',function(){
      fs.forEach(function(f,i){
        f.classList.remove('bad');
        var input = f.querySelector('input'), small = f.querySelector('small');
        ctx.wait(function(){
          f.classList.add('bad');
          anime.remove(input); anime.remove(small);
          anime({
            targets:input,
            translateX:[-2, 4, -7, 7, -7, 7, -7, 4, -2, 0],
            duration:380, easing:'linear'
          });
          anime.set(small, { opacity:0, translateY:-4 });
          anime({ targets:small, opacity:1, translateY:0, duration:250, easing:'easeOutQuad' });
        }, i * 90);
      });
    });
    ctx.clean(function(){
      fs.forEach(function(f){
        anime.remove(f.querySelector('input')); anime.remove(f.querySelector('small'));
      });
    });
  }
},

{
  id:'x03', cat:'estado', title:'Label flutuante',
  desc:'O estado vem do focus/valor; o movimento do rótulo é um tween do Anime.js.',
  tags:['form','label','anime.js'], hint:'clique e digite',
  html:`
    <div class="x03">
      <div class="x03-f"><input id="x03a" placeholder=" "><label for="x03a">Nome completo</label></div>
      <div class="x03-f"><input id="x03b" placeholder=" " value="raffa@empresa.com"><label for="x03b">E-mail</label></div>
    </div>`,
  css:`
    .x03{width:220px;display:flex;flex-direction:column;gap:16px}
    .x03-f{position:relative}
    .x03 input{width:100%;padding:18px 13px 8px;border-radius:10px;background:#1a1814;border:1px solid #2b2721;
      color:#efece6;font-size:13px;outline:0;transition:border-color .25s}
    .x03 input:focus{border-color:#d4af37}
    .x03 label{position:absolute;left:13px;top:14px;font-size:13px;color:#736f68;pointer-events:none;
      transform-origin:0 0}`,
  js:function(root,ctx){
    root.querySelectorAll('.x03-f').forEach(function(f){
      var input = f.querySelector('input'), label = f.querySelector('label');
      function upd(instant){
        var up = document.activeElement === input || input.value;
        anime.remove(label);
        if (instant){
          anime.set(label, { translateY:up ? -9 : 0, scale:up ? .76 : 1 });
        } else {
          anime({ targets:label, translateY:up ? -9 : 0, scale:up ? .76 : 1,
                  duration:280, easing:'easeOutQuint' });
        }
        label.style.color = up ? '#d4af37' : '#736f68';
      }
      upd(true);
      ctx.on(input,'focus',function(){ upd(); });
      ctx.on(input,'blur',function(){ upd(); });
      ctx.on(input,'input',function(){ upd(); });
      ctx.clean(function(){ anime.remove(label); });
    });
  }
},

{
  id:'x04', cat:'estado', title:'Like com explosão de partículas',
  desc:'Coração com mola + 8 partículas radiais geradas na hora (Anime.js).',
  tags:['burst','spring','anime.js'], hint:'clique no coração',
  html:`
    <div class="x04">
      <button class="x04-b">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <b class="x04-n">128</b>
    </div>`,
  css:`
    .x04{display:flex;align-items:center;gap:12px}
    .x04-b{position:relative;width:56px;height:56px;display:grid;place-items:center}
    .x04-b svg{width:30px;height:30px;fill:none;stroke:#736f68;stroke-width:1.8;
      transition:stroke .25s,fill .25s}
    .x04-b.on svg{fill:#e5645f;stroke:#e5645f}
    .x04-p{position:absolute;width:5px;height:5px;border-radius:50%;pointer-events:none}
    .x04-n{font-size:15px;font-weight:700;color:#ccc7bc;font-variant-numeric:tabular-nums;
      transition:color .3s}
    .x04-n.on{color:#e5645f}`,
  js:function(root,ctx){
    var b = root.querySelector('.x04-b'),
        heart = b.querySelector('svg'),
        n = root.querySelector('.x04-n'), v = 128;
    ctx.on(b,'click',function(){
      var on = b.classList.toggle('on');
      n.classList.toggle('on', on);
      n.textContent = (v += on ? 1 : -1);
      if (!on) return;
      anime.remove(heart);
      anime({ targets:heart, scale:[1, .82, 1.25, 1], duration:550, easing:'easeOutQuad' });
      for (var i = 0; i < 9; i++){
        var s = document.createElement('span'),
            a = (i/9) * Math.PI * 2,
            d = 26 + Math.random()*14;
        s.className = 'x04-p';
        s.style.background = ['#e5645f','#cf9b6a','#e8c96a'][i%3];
        b.appendChild(s);
        anime({
          targets:s,
          translateX:Math.cos(a)*d, translateY:Math.sin(a)*d,
          scale:[1,0], opacity:[1,0],
          duration:620, delay:i*8, easing:'easeOutQuint',
          complete:function(an){ an.animatables[0].target.remove(); }
        });
      }
    });
    ctx.clean(function(){
      anime.remove(heart);
      b.querySelectorAll('.x04-p').forEach(function(p){ anime.remove(p); p.remove(); });
    });
  }
},

{
  id:'x05', cat:'estado', title:'Toggle com física',
  desc:'A bolinha estica no meio do caminho (squash) e assenta com mola (Anime.js).',
  tags:['toggle','spring','anime.js'], hint:'clique',
  html:`
    <div class="x05">
      <label class="x05-s"><input type="checkbox" checked><i></i></label>
      <label class="x05-s alt"><input type="checkbox"><i></i></label>
    </div>`,
  css:`
    .x05{display:flex;flex-direction:column;gap:18px;align-items:center}
    .x05-s{cursor:pointer}
    .x05-s input{position:absolute;opacity:0;pointer-events:none}
    .x05-s i{display:block;width:62px;height:34px;border-radius:99px;background:#2a2620;padding:4px}
    .x05-s i::after{content:"";display:block;width:var(--kw,26px);height:26px;border-radius:99px;background:#fff;
      transform:translateX(var(--tx,0px))}
    .x05-s.alt i::after{border-radius:9px}`,
  js:function(root,ctx){
    var states = [];
    root.querySelectorAll('.x05-s').forEach(function(lab){
      var input = lab.querySelector('input'),
          track = lab.querySelector('i'),
          alt = lab.classList.contains('alt'),
          st = { tx:input.checked ? 28 : 0, kw:26 };
      states.push(st);
      function draw(){
        track.style.setProperty('--tx', st.tx + 'px');
        track.style.setProperty('--kw', st.kw + 'px');
      }
      draw();
      track.style.background = input.checked ? (alt ? '#b08ac9' : '#5cc88f') : '#2a2620';
      ctx.on(lab,'pointerdown',function(){
        anime.remove(st);
        anime({ targets:st, kw:34, tx:input.checked ? 20 : 0, duration:300, easing:'easeOutBack', update:draw });
      });
      ctx.on(input,'change',function(){
        anime.remove(st); anime.remove(track);
        anime({ targets:st, tx:input.checked ? 28 : 0, kw:26,
                duration:480, easing:'easeOutElastic(1, .6)', update:draw });
        anime({ targets:track, backgroundColor:input.checked ? (alt ? '#b08ac9' : '#5cc88f') : '#2a2620',
                duration:350, easing:'easeOutQuad' });
      });
      ctx.clean(function(){ anime.remove(st); anime.remove(track); });
    });
  }
},

{
  id:'x06', cat:'estado', title:'Copiar com confirmação',
  desc:'O ícone morfa para check e o rótulo desliza. Volta sozinho em 1,6s (Anime.js).',
  tags:['clipboard','morph','anime.js'], hint:'clique em copiar',
  html:`
    <div class="x06">
      <pre class="x06-c">npm i motion-db</pre>
      <button class="x06-b">
        <svg class="i1" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="i2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
        <span><i>Copiar</i><i>Copiado!</i></span>
      </button>
    </div>`,
  css:`
    .x06{display:flex;flex-direction:column;gap:12px;align-items:center}
    .x06-c{margin:0;padding:12px 16px;border-radius:10px;background:#141312;border:1px solid #24211a;
      font-family:var(--mono);font-size:12.5px;color:#dcd0a8}
    .x06-b{display:flex;align-items:center;gap:8px;padding:9px 15px;border-radius:9px;
      background:#221f19;border:1px solid #2e2a22;font-size:12.5px;font-weight:600;color:#e8e5df;
      transition:background .3s,border-color .3s,color .3s}
    .x06-b.ok{background:#0f2b21;border-color:#5cc88f55;color:#5cc88f}
    .x06-b svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;
      stroke-linejoin:round}
    .x06-b .i1,.x06-b .i2{display:block}
    .x06-b svg{position:absolute}
    .x06-b{position:relative;padding-left:34px}
    .x06-b svg{left:13px;top:50%;margin-top:-7.5px}
    .x06-b .i2{opacity:0;transform:scale(.5) rotate(-30deg)}
    .x06-b span{display:block;height:1.35em;overflow:hidden}
    .x06-b i{display:block;height:1.35em;line-height:1.35em;font-style:normal}`,
  js:function(root,ctx){
    var b = root.querySelector('.x06-b'),
        i1 = b.querySelector('.i1'), i2 = b.querySelector('.i2'),
        labels = b.querySelectorAll('span i'),
        txt = root.querySelector('.x06-c').textContent;
    function set(ok){
      b.classList.toggle('ok', ok);
      anime.remove(i1); anime.remove(i2); anime.remove(labels);
      anime({ targets:i1, opacity:ok ? 0 : 1, scale:ok ? .5 : 1, rotate:ok ? 30 : 0,
              duration:350, easing:'easeOutQuad' });
      anime({ targets:i2, opacity:ok ? 1 : 0, scale:ok ? 1 : .5, rotate:ok ? 0 : -30,
              duration:350, easing:'easeOutBack' });
      anime({ targets:labels, translateY:ok ? '-100%' : '0%', duration:400, easing:'easeOutQuint' });
    }
    ctx.on(b,'click',function(){
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function(){});
      set(true);
      ctx.wait(function(){ set(false); }, 1600);
    });
    ctx.clean(function(){ anime.remove(i1); anime.remove(i2); anime.remove(labels); });
  }
},

{
  id:'x07', cat:'estado', title:'Drag & drop com placeholder',
  desc:'O item some do fluxo, um vazio abre espaço e a solta encaixa com mola (Anime.js).',
  tags:['drag','pointer events','anime.js'], hint:'arraste os cards',
  html:`
    <div class="x07">
      <div class="x07-col" data-c="A"><b>A fazer</b><div class="x07-i">Escrever briefing</div><div class="x07-i">Coletar refs</div></div>
      <div class="x07-col" data-c="B"><b>Feito</b><div class="x07-i">Setup do repo</div></div>
    </div>`,
  css:`
    .x07{display:flex;gap:10px;width:100%;padding:14px;align-items:flex-start}
    .x07-col{flex:1;min-height:150px;padding:10px;border-radius:12px;background:#171510;border:1px dashed #2a2620;
      transition:background .25s,border-color .25s}
    .x07-col.hot{background:#191611;border-color:#d4af3788}
    .x07-col b{display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;color:#6b675f;margin-bottom:9px}
    .x07-i{padding:10px;margin-bottom:7px;border-radius:9px;background:#221f19;border:1px solid #2e2a22;
      font-size:12px;color:#d8d3c8;cursor:grab;touch-action:none}
    .x07-i.drag{position:fixed;z-index:99;pointer-events:none;cursor:grabbing;width:120px;
      box-shadow:0 18px 40px -14px #000;transform:rotate(-3deg) scale(1.04)}
    .x07-ph{height:36px;margin-bottom:7px;border-radius:9px;border:1px dashed #d4af3755;background:#d4af370e}`,
  js:function(root,ctx){
    var cur = null, ph = null, ox = 0, oy = 0;
    var items = root.querySelectorAll('.x07-i');
    anime({ targets:items, scale:[.94,1], opacity:[0,1], duration:400,
            delay:anime.stagger(60), easing:'easeOutBack',
            complete:function(){ items.forEach(function(el){ el.style.transform = ''; }); } });
    function grab(e){
      var it = e.target.closest('.x07-i'); if (!it) return;
      cur = it;
      anime.remove(it); it.style.transform = '';
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
      var el = cur;
      ph.parentNode.insertBefore(el, ph);
      ph.remove();
      el.classList.remove('drag');
      el.style.left = el.style.top = '';
      anime({ targets:el, scale:[.94,1], opacity:[0,1], duration:400, easing:'easeOutBack',
              complete:function(){ el.style.transform = ''; } });
      root.querySelectorAll('.x07-col').forEach(function(c){ c.classList.remove('hot'); });
      cur = null;
    }
    ctx.on(root,'pointerdown',grab);
    ctx.on(root,'pointermove',move);
    ctx.on(root,'pointerup',drop);
    ctx.on(root,'pointercancel',drop);
    ctx.clean(function(){
      root.querySelectorAll('.x07-i').forEach(function(el){ anime.remove(el); });
    });
  }
},

{
  id:'x08', cat:'estado', title:'Reorder de lista com FLIP',
  desc:'First-Last-Invert-Play: mede antes e depois e anima a diferença (Anime.js).',
  tags:['FLIP','reorder','anime.js'], hint:'clique em embaralhar',
  html:`
    <div class="x08">
      <ul class="x08-l">
        <li data-k="1"><i>1</i> Definir escopo</li>
        <li data-k="2"><i>2</i> Wireframe</li>
        <li data-k="3"><i>3</i> UI kit</li>
        <li data-k="4"><i>4</i> Protótipo</li>
        <li data-k="5"><i>5</i> Handoff</li>
      </ul>
      <button class="x08-b">Embaralhar</button>
    </div>`,
  css:`
    .x08{width:230px}
    .x08-l{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-direction:column;gap:6px}
    .x08-l li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;
      background:#1f1c17;border:1px solid #2a2620;font-size:12.5px;color:#dad5cb;will-change:transform}
    .x08-l i{width:19px;height:19px;border-radius:6px;background:#d4af3722;color:#d4af37;
      display:grid;place-items:center;font-style:normal;font-size:10.5px;font-family:var(--mono)}
    .x08-b{width:100%;padding:9px;border-radius:9px;background:#2b2721;color:#e8e5df;font-size:12px;font-weight:600}`,
  js:function(root,ctx){
    var ul = root.querySelector('.x08-l');
    ctx.on(root.querySelector('.x08-b'),'click',function(){
      var items = Array.prototype.slice.call(ul.children);

      // FIRST — posição atual
      var first = items.map(function(el){ return el.getBoundingClientRect().top; });

      // embaralha o DOM
      items.slice().sort(function(){ return Math.random() - .5; })
           .forEach(function(el){ ul.appendChild(el); });

      // LAST + INVERT + PLAY (com Anime.js)
      items.forEach(function(el,i){
        var d = first[i] - el.getBoundingClientRect().top;
        if (!d) return;
        anime.remove(el);
        anime({ targets:el, translateY:[d, 0], duration:520, easing:'easeOutQuint' });
      });
    });
    ctx.clean(function(){
      Array.prototype.forEach.call(ul.children, function(el){ anime.remove(el); });
    });
  }
},

{
  id:'x09', cat:'estado', title:'Pull to refresh',
  desc:'Arraste para baixo: o indicador gira conforme a distância e solta o loading (Anime.js).',
  tags:['pull','pointer','anime.js'], hint:'arraste para baixo',
  html:`
    <div class="x09">
      <div class="x09-ind"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg></div>
      <div class="x09-list">
        <div class="x09-r"><i></i><span>Nova mensagem de Ana</span></div>
        <div class="x09-r"><i></i><span>Build #482 concluído</span></div>
        <div class="x09-r"><i></i><span>Fatura disponível</span></div>
        <div class="x09-r"><i></i><span>3 comentários novos</span></div>
      </div>
    </div>`,
  css:`
    .x09{position:relative;width:210px;height:100%;overflow:hidden;touch-action:none;cursor:grab}
    .x09:active{cursor:grabbing}
    .x09-ind{position:absolute;top:8px;left:50%;margin-left:-15px;width:30px;height:30px;border-radius:50%;
      background:#211e18;border:1px solid #2e2a22;display:grid;place-items:center;opacity:0}
    .x09-ind svg{width:15px;height:15px;fill:none;stroke:#d4af37;stroke-width:2;stroke-linecap:round}
    .x09-list{padding:14px 0;will-change:transform}
    .x09-r{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid #221f19}
    .x09-r i{width:8px;height:8px;border-radius:50%;background:#d4af37;flex:none}
    .x09-r span{font-size:12px;color:#bdb8ad}`,
  js:function(root,ctx){
    var box = root.querySelector('.x09'),
        list = root.querySelector('.x09-list'),
        ind = root.querySelector('.x09-ind'),
        icon = ind.querySelector('svg'),
        y0 = 0, d = 0, down = false, busy = false, n = 5, spin = null;

    ctx.on(box,'pointerdown',function(e){
      if (busy) return; down = true; y0 = e.clientY; box.setPointerCapture(e.pointerId);
      anime.remove(list); anime.remove(ind); anime.remove(icon);
    });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      d = Math.max(0, (e.clientY - y0) * .5);
      d = Math.min(d, 70);
      anime.set(list, { translateY:d });
      anime.set(ind, { opacity:Math.min(1, d / 40), translateY:d * .5 });
      anime.set(icon, { rotate:d * 5 });
    });
    ctx.on(box,'pointerup',function(){
      if (!down) return;
      down = false;
      if (d > 48){
        busy = true;
        spin = anime({ targets:icon, rotate:'+=360', duration:800, easing:'linear', loop:true });
        anime({ targets:list, translateY:34, duration:450, easing:'easeOutQuint' });
        anime({ targets:ind, translateY:14, opacity:1, duration:450, easing:'easeOutQuint' });
        ctx.wait(function(){
          var r = document.createElement('div');
          r.className = 'x09-r';
          r.innerHTML = '<i></i><span>Item novo #' + (++n) + '</span>';
          list.prepend(r);
          anime({ targets:r, opacity:[0,1], translateY:[-12,0], duration:500, easing:'easeOutQuint' });
          spin.pause(); anime.remove(icon); anime.set(icon, { rotate:0 });
          anime({ targets:list, translateY:0, duration:450, easing:'easeOutQuint' });
          anime({ targets:ind, translateY:0, opacity:0, duration:300, easing:'easeOutQuad' });
          busy = false;
        }, 1200);
      } else {
        anime({ targets:list, translateY:0, duration:450, easing:'easeOutQuint' });
        anime({ targets:ind, translateY:0, opacity:0, duration:300, easing:'easeOutQuad' });
      }
      d = 0;
    });
    ctx.clean(function(){
      if (spin) spin.pause();
      anime.remove(list); anime.remove(ind); anime.remove(icon);
    });
  }
},

{
  id:'x10', cat:'estado', title:'UI otimista',
  desc:'O item aparece imediatamente em estado "pendente" e confirma depois (Anime.js).',
  tags:['optimistic','pending','anime.js'], hint:'clique em adicionar',
  html:`
    <div class="x10">
      <ul class="x10-l">
        <li><b>Comprar café</b><s>ok</s></li>
        <li><b>Renovar domínio</b><s>ok</s></li>
      </ul>
      <button class="x10-b">+ Adicionar tarefa</button>
    </div>`,
  css:`
    .x10{width:220px}
    .x10-l{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-direction:column;gap:6px}
    .x10-l li{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:9px;
      background:#1f1c17;border:1px solid #2a2620;font-size:12.5px;color:#dad5cb}
    .x10-l li b{font-weight:500;flex:1}
    .x10-l s{text-decoration:none;font-size:9.5px;font-family:var(--mono);color:#5cc88f;
      border:1px solid #5cc88f44;border-radius:5px;padding:1px 5px}
    .x10-l li.pend{opacity:.55;border-style:dashed}
    .x10-l li.pend s{color:#e8c96a;border-color:#e8c96a44}
    .x10-l li.pend b::after{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;
      background:#e8c96a;margin-left:6px}
    .x10-b{width:100%;padding:9px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12px;font-weight:700}`,
  js:function(root,ctx){
    var ul = root.querySelector('.x10-l'), n = 0;
    var nomes = ['Revisar contrato','Subir para produção','Ligar pro cliente','Fechar sprint'];
    ctx.on(root.querySelector('.x10-b'),'click',function(){
      var li = document.createElement('li');
      li.className = 'pend';
      li.innerHTML = '<b>' + nomes[n++ % nomes.length] + '</b><s>salvando</s>';
      ul.prepend(li);
      anime({ targets:li, opacity:[0,.55], translateY:[-8,0], scale:[.97,1],
              duration:450, easing:'easeOutQuint' });
      var badge = li.querySelector('s');
      var pulse = anime({ targets:badge, opacity:[1,.3], duration:450,
                          direction:'alternate', loop:true, easing:'easeInOutSine' });
      ctx.wait(function(){
        pulse.pause(); anime.remove(badge); anime.set(badge, { opacity:1 });
        li.classList.remove('pend');
        anime.remove(li); anime.set(li, { opacity:1 });
        badge.textContent = 'ok';
      }, 1200 + Math.random() * 700);
      ctx.clean(function(){ pulse.pause(); anime.remove(badge); anime.remove(li); });
    });
  }
},

{
  id:'d01', cat:'dados', title:'Barras crescendo',
  desc:'Altura animada com stagger e o valor subindo junto no topo (Anime.js).',
  tags:['chart','stagger','anime.js'], hint:'passe o mouse',
  html:`
    <div class="d01">
      <div class="d01-ch">
        <div class="d01-b" style="--v:62"><b>62</b><i></i><small>Jan</small></div>
        <div class="d01-b" style="--v:88"><b>88</b><i></i><small>Fev</small></div>
        <div class="d01-b" style="--v:41"><b>41</b><i></i><small>Mar</small></div>
        <div class="d01-b" style="--v:95"><b>95</b><i></i><small>Abr</small></div>
        <div class="d01-b" style="--v:73"><b>73</b><i></i><small>Mai</small></div>
        <div class="d01-b" style="--v:100"><b>100</b><i></i><small>Jun</small></div>
      </div>
    </div>`,
  css:`
    .d01-ch{display:flex;align-items:flex-end;gap:10px;height:150px}
    .d01-b{position:relative;width:26px;height:100%;display:flex;flex-direction:column;justify-content:flex-end}
    .d01-b i{display:block;height:0;border-radius:6px 6px 3px 3px;
      background:linear-gradient(#d4af37,#b8871f);transition:filter .25s}
    .d01-b:hover i{filter:brightness(1.35)}
    .d01-b b{position:absolute;left:0;right:0;text-align:center;font-size:10px;font-family:var(--mono);
      color:#948f86;opacity:0;bottom:calc(var(--v) * .87%);transition:color .25s}
    .d01-b:hover b{color:#d4af37}
    .d01-b small{position:absolute;bottom:-18px;left:0;right:0;text-align:center;font-size:9.5px;color:#66625a}`,
  js:function(root,ctx){
    var bars = root.querySelectorAll('.d01-b');
    bars.forEach(function(b,i){
      var v = +getComputedStyle(b).getPropertyValue('--v');
      anime({ targets:b.querySelector('i'), height:(v * .87) + '%',
              duration:1000, delay:80 + i * 90, easing:'easeOutQuint' });
      anime({ targets:b.querySelector('b'), opacity:1, translateY:-4,
              duration:500, delay:80 + i * 90, easing:'easeOutQuint' });
    });
    ctx.clean(function(){
      bars.forEach(function(b){
        anime.remove(b.querySelector('i')); anime.remove(b.querySelector('b'));
      });
    });
  }
},

{
  id:'d02', cat:'dados', title:'Donut desenhando',
  desc:'stroke-dashoffset em círculos SVG + contador no centro (Anime.js).',
  tags:['SVG','donut','anime.js'],
  html:`
    <div class="d02">
      <svg viewBox="0 0 120 120">
        <circle class="tr" cx="60" cy="60" r="50"/>
        <circle class="a"  cx="60" cy="60" r="50"/>
        <circle class="b"  cx="60" cy="60" r="50"/>
        <circle class="c"  cx="60" cy="60" r="50"/>
      </svg>
      <div class="d02-mid"><b>0</b><small>%&nbsp;concluído</small></div>
    </div>`,
  css:`
    .d02{position:relative;width:170px;height:170px;display:grid;place-items:center}
    .d02 svg{width:170px;height:170px;transform:rotate(-90deg)}
    .d02 circle{fill:none;stroke-width:11;stroke-linecap:round}
    .d02 .tr{stroke:#1f1c17}
    .d02 .a{stroke:#d4af37}
    .d02 .b{stroke:#b08ac9}
    .d02 .c{stroke:#5cc88f}
    .d02-mid{position:absolute;text-align:center}
    .d02-mid b{font-size:28px;font-weight:800;color:#f4f1eb;font-variant-numeric:tabular-nums}
    .d02-mid small{display:block;font-size:10px;color:#6b675f;letter-spacing:.05em}`,
  js:function(root,ctx){
    var C = 2 * Math.PI * 50;                        // circunferência
    var segs = [{ el:'.a', v:.46, off:0 }, { el:'.b', v:.28, off:.46 }, { el:'.c', v:.14, off:.74 }];
    var els = [];
    segs.forEach(function(s,i){
      var el = root.querySelector(s.el);
      els.push(el);
      el.style.strokeDasharray = C;
      el.style.strokeDashoffset = C;
      el.style.transform = 'rotate(' + (s.off * 360) + 'deg)';
      el.style.transformOrigin = '60px 60px';
      anime({ targets:el, strokeDashoffset:[C, C * (1 - s.v)],
              duration:1100, delay:120 + i * 260, easing:'easeOutQuint' });
    });
    var out = root.querySelector('.d02-mid b'), o = { v:0 };
    anime({ targets:o, v:88, duration:1700, round:1, easing:'easeOutCubic',
            update:function(){ out.textContent = o.v; } });
    ctx.clean(function(){ els.forEach(function(el){ anime.remove(el); }); anime.remove(o); });
  }
},

{
  id:'d03', cat:'dados', title:'Linha se desenhando + área',
  desc:'O path é traçado, a área entra em fade e os pontos aparecem em cascata (Anime.js).',
  tags:['SVG','path','anime.js'],
  html:`<svg class="d03" viewBox="0 0 260 130" preserveAspectRatio="none"></svg>`,
  css:`
    .d03{width:250px;height:130px;overflow:visible}
    .d03 .grid{stroke:#1d1d28;stroke-width:1}
    .d03 .area{fill:url(#d03g);opacity:0}
    .d03 .line{fill:none;stroke:#d4af37;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .d03 .dot{fill:#0d0c0b;stroke:#d4af37;stroke-width:2.2;opacity:0;
      transform-box:fill-box;transform-origin:center}`,
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
      pts.map(function(p){
        return '<circle class="dot" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.4"/>';
      }).join('');

    var line = svg.querySelector('.line'),
        area = svg.querySelector('.area'),
        dots = svg.querySelectorAll('.dot'),
        L = line.getTotalLength();
    line.style.strokeDasharray = L;
    line.style.strokeDashoffset = L;
    anime({ targets:line, strokeDashoffset:[L, 0], duration:1500, delay:80, easing:'easeInOutQuart' });
    anime({ targets:area, opacity:[0, 1], duration:800, delay:580, easing:'easeOutQuad' });
    anime({ targets:dots, opacity:[0, 1], scale:[0, 1], duration:450,
            delay:anime.stagger(70, { start:780 }), easing:'easeOutBack' });
    ctx.clean(function(){ anime.remove(line); anime.remove(area); anime.remove(dots); });
  }
},

{
  id:'d04', cat:'dados', title:'Tooltip que segue o dado',
  desc:'Encontra o ponto mais próximo do cursor e move o marcador com tween do Anime.js.',
  tags:['chart','tooltip','anime.js'], hint:'passe o mouse',
  html:`
    <div class="d04">
      <svg viewBox="0 0 260 120" preserveAspectRatio="none"></svg>
      <div class="d04-cur"></div>
      <div class="d04-tip"><b>0</b><span>—</span></div>
    </div>`,
  css:`
    .d04{position:relative;width:250px;height:120px;cursor:crosshair}
    .d04 svg{width:100%;height:100%;overflow:visible}
    .d04 .ln{fill:none;stroke:#b08ac9;stroke-width:2.4;stroke-linejoin:round}
    .d04 .ar{fill:#b08ac91a}
    .d04-cur{position:absolute;top:0;bottom:0;width:1px;background:#b08ac955;opacity:0;transition:opacity .2s}
    .d04-cur::after{content:"";position:absolute;left:-4.5px;width:9px;height:9px;border-radius:50%;
      background:#0d0c0b;border:2.2px solid #b08ac9;top:var(--dy,0);margin-top:-4.5px}
    .d04-tip{position:absolute;top:-4px;left:0;padding:5px 9px;border-radius:8px;background:#f0ede7;color:#0e0d0c;
      font-size:11px;font-weight:700;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s}
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

    var st = { px:0, py:0, tx:0, ty:0 };
    function draw(){
      cur.style.transform = 'translateX(' + st.px + 'px)';
      cur.style.setProperty('--dy', st.py + 'px');
      tip.style.transform = 'translate(' + st.tx + 'px,' + st.ty + 'px)';
    }
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * W;
      var i = Math.max(0, Math.min(pts.length - 1, Math.round(x / step)));
      var px = pts[i][0] / W * r.width, py = pts[i][1] / H * r.height;
      tip.innerHTML = '<b>R$ ' + vals[i].toLocaleString('pt-BR') + '</b><span>' + meses[i] + '</span>';
      anime.remove(st);
      anime({
        targets:st,
        px:px, py:py,
        tx:Math.min(r.width - 100, Math.max(0, px - 40)),
        ty:Math.max(0, py - 34),
        duration:180, easing:'easeOutQuint', update:draw
      });
    });
    ctx.clean(function(){ anime.remove(st); });
  }
},

{
  id:'d05', cat:'dados', title:'Transição entre datasets',
  desc:'Interpolação dos valores antigos para os novos — nunca corte seco (Anime.js).',
  tags:['morph','interpolate','anime.js'], hint:'clique para trocar',
  html:`
    <div class="d05">
      <svg viewBox="0 0 250 110" preserveAspectRatio="none"><path class="pp"/></svg>
      <div class="d05-bars"></div>
      <div class="d05-tabs"><button class="on">2024</button><button>2025</button><button>meta</button></div>
    </div>`,
  css:`
    .d05{width:250px}
    .d05 svg{width:100%;height:70px;display:block}
    .d05 .pp{fill:none;stroke:#5cc88f;stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round}
    .d05-bars{display:flex;align-items:flex-end;gap:6px;height:52px;margin-top:6px}
    .d05-bars i{flex:1;border-radius:4px 4px 2px 2px;background:linear-gradient(#5cc88f,#2f7d55)}
    .d05-tabs{display:flex;gap:4px;margin-top:12px}
    .d05-tabs button{flex:1;padding:6px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;
      transition:.2s}
    .d05-tabs button.on{background:#5cc88f22;color:#5cc88f}`,
  js:function(root,ctx){
    var sets = [
      [30, 55, 42, 70, 60, 85, 74],
      [80, 45, 92, 38, 70, 55, 96],
      [50, 58, 66, 74, 82, 90, 98]
    ];
    var st = {};
    sets[0].forEach(function(v,i){ st['v' + i] = v; });
    var path = root.querySelector('.pp'), bars = root.querySelector('.d05-bars');
    bars.innerHTML = sets[0].map(function(){ return '<i></i>'; }).join('');
    var els = bars.querySelectorAll('i');

    function draw(){
      var d = '';
      for (var i = 0; i < 7; i++){
        var v = st['v' + i];
        var x = i * (250 / 6);
        var y = 105 - (v / 100) * 96;
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
        els[i].style.height = v.toFixed(1) + '%';
      }
      path.setAttribute('d', d);
    }
    draw();

    root.querySelectorAll('.d05-tabs button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.d05-tabs button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var p = { targets:st, duration:900, easing:'easeOutQuart', update:draw };
        sets[i].forEach(function(v,j){ p['v' + j] = v; });
        anime.remove(st);
        anime(p);
      });
    });
    ctx.clean(function(){ anime.remove(st); });
  }
},

{
  id:'d06', cat:'dados', title:'Heatmap em onda',
  desc:'As células acendem numa diagonal — leitura guiada em vez de tudo de uma vez (Anime.js).',
  tags:['heatmap','stagger','anime.js'],
  html:`<div class="d06"></div>`,
  css:`
    .d06{display:grid;grid-template-columns:repeat(14,1fr);gap:4px;width:250px}
    .d06 i{aspect-ratio:1;border-radius:3px;background:#1c1a15;
      transition:transform .2s,filter .2s}
    .d06 i:hover{transform:scale(1.35);filter:brightness(1.5);z-index:2}`,
  js:function(root,ctx){
    var box = root.querySelector('.d06'), C = 14, R = 7, out = '';
    var cores = ['#1c1a15','#24382c','#2b6b4d','#3f8a63','#5cc88f'];
    for (var r = 0; r < R; r++){
      for (var c = 0; c < C; c++){
        var v = Math.max(0, Math.min(4, Math.round(
          (Math.sin(c * .5) + Math.cos(r * .8)) * 1.2 + Math.random() * 2
        )));
        out += '<i style="background:' + cores[v] + '"></i>';
      }
    }
    box.innerHTML = out;
    var cells = box.querySelectorAll('i');
    anime({
      targets:cells,
      scale:[.3, 1], opacity:[0, 1],
      duration:500, easing:'easeOutBack',
      delay:function(el,i){ return ((i % C) + ((i / C) | 0)) * 34; },
      complete:function(){                        // limpa o inline p/ o hover CSS funcionar
        cells.forEach(function(el){ el.style.transform = ''; });
      }
    });
    ctx.clean(function(){ anime.remove(cells); });
  }
},

{
  id:'a01', cat:'avancado', title:'Objeto 3D em CSS puro',
  desc:'Cubo com preserve-3d girando sozinho — e arrastável com o mouse.',
  tags:['3D','preserve-3d','anime.js'], hint:'arraste o cubo',
  html:`
    <div class="a01">
      <div class="a01-sc">
        <div class="a01-cb">
          <span class="f1">01</span><span class="f2">02</span><span class="f3">03</span>
          <span class="f4">04</span><span class="f5">05</span><span class="f6">06</span>
        </div>
      </div>
    </div>`,
  css:`
    .a01{width:100%;height:100%;display:grid;place-items:center;perspective:700px;cursor:grab}
    .a01:active{cursor:grabbing}
    .a01-sc{transform-style:preserve-3d}
    .a01-cb{position:relative;width:96px;height:96px;transform-style:preserve-3d}
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
  desc:'A imagem é redesenhada em fatias deslocadas por uma onda centrada no cursor. Amplitude via Anime.js.',
  tags:['canvas','displacement','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a02"></canvas>`,
  css:`.a02{width:100%;height:100%;display:block;background:#090807;cursor:crosshair}`,
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

    var mx = -999, my = -999, st = { amp:0 };
    function go(v){
      anime.remove(st);
      anime({ targets:st, amp:v, duration:600, easing:'easeOutQuad' });
    }
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      if (st.amp < 1) go(1);
    });
    ctx.on(cv,'mouseleave',function(){ go(0); });

    var t = 0;
    ctx.loop(function(){
      t += .06;
      c.clearRect(0,0,w,h);
      for (var y = 0; y < h; y += 3){
        var d = Math.abs(y - my);
        var f = Math.exp(-d * d / 2600);                    // gaussiana em torno do cursor
        var off = Math.sin(y * .05 + t) * 26 * f * st.amp;
        c.drawImage(src, 0, y, w, 3, off, y, w, 3);
      }
    });
    ctx.clean(function(){ anime.remove(st); });
  }
},

{
  id:'a03', cat:'avancado', title:'Ripple de água (buffer duplo)',
  desc:'Algoritmo clássico de propagação de ondas em dois buffers, deformando a imagem.',
  tags:['canvas','simulation','anime.js'], stage:'flush', hint:'clique e arraste',
  html:`<canvas class="a03"></canvas>`,
  css:`.a03{width:100%;height:100%;display:block;cursor:pointer;image-rendering:auto}`,
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
  desc:'Grade que se repete nos dois eixos por módulo — nunca acaba.',
  tags:['drag','infinite','anime.js'], stage:'flush', hint:'arraste em qualquer direção',
  html:`<div class="a04"><div class="a04-w"></div><b class="a04-h">drag</b></div>`,
  css:`
    .a04{position:relative;width:100%;height:100%;overflow:hidden;cursor:grab;background:#0a0908}
    .a04:active{cursor:grabbing}
    .a04-w{position:absolute;inset:0}
    .a04-t{position:absolute;width:92px;height:70px;border-radius:10px;overflow:hidden;
      display:grid;place-items:center;font-family:var(--mono);font-size:12px;color:#ffffff66;
      border:1px solid #ffffff14;will-change:transform;user-select:none}
    .a04-h{position:absolute;left:10px;top:8px;font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;
      text-transform:uppercase;color:#453f38;pointer-events:none}`,
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
  desc:'Dois paths com o mesmo número de pontos: o Anime.js interpola coordenada a coordenada.',
  tags:['SVG','morph','anime.js'], hint:'clique nas formas',
  html:`
    <div class="a05">
      <svg viewBox="0 0 200 200"><path class="a05-p"/></svg>
      <div class="a05-btns"><button class="on">estrela</button><button>flor</button><button>engrenagem</button></div>
    </div>`,
  css:`
    .a05{display:flex;flex-direction:column;align-items:center;gap:10px}
    .a05 svg{width:150px;height:150px}
    .a05-p{fill:#d4af37;filter:drop-shadow(0 6px 18px #d4af3733)}
    .a05-btns{display:flex;gap:5px}
    .a05-btns button{padding:5px 11px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
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
    var cur = sample(shapes[0]), path = root.querySelector('.a05-p'), k = { t:1 };
    function render(){
      var d = '';
      for (var i = 0; i < cur.length; i += 2)
        d += (i ? 'L' : 'M') + cur[i].toFixed(1) + ' ' + cur[i+1].toFixed(1);
      path.setAttribute('d', d + 'Z');
    }
    render();

    root.querySelectorAll('.a05-btns button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.a05-btns button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var from = cur.slice(), to = sample(shapes[i]);
        anime.remove(k); anime.remove(path);
        k.t = 0;
        anime({
          targets:k, t:1, duration:800, easing:'easeOutQuart',
          update:function(){
            for (var j = 0; j < cur.length; j++) cur[j] = from[j] + (to[j] - from[j]) * k.t;
            render();
          }
        });
        anime({ targets:path, fill:['#d4af37','#cf9b6a','#5cc88f'][i], duration:400, easing:'linear' });
      });
    });
    ctx.clean(function(){ anime.remove(k); anime.remove(path); });
  }
},

{
  id:'a06', cat:'avancado', title:'Smooth scroll + parallax (estilo Lenis)',
  desc:'A rolagem real é interpolada; o conteúdo se move com atraso e inércia.',
  tags:['lerp','smooth scroll','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="a06">
      <div class="a06-vp">
        <div class="a06-in">
          <h5 data-d="0.4">Suave</h5>
          <p data-d="0.7">A posição desejada é o scrollTop real; a exibida persegue com lerp.</p>
          <div class="a06-card" data-d="1.25">camada rápida</div>
          <div class="a06-card b" data-d="0.55">camada lenta</div>
          <h5 data-d="0.9">Inércia</h5>
          <p data-d="1.1">É o mesmo princípio do Lenis, Locomotive e afins.</p>
        </div>
      </div>
      <div class="a06-spacer"></div>
    </div>`,
  css:`
    .a06{height:820px;position:relative}
    .a06-vp{position:sticky;top:0;height:230px;overflow:hidden;background:linear-gradient(#0e0d0c,#161310)}
    .a06-in{padding:24px 20px;display:flex;flex-direction:column;gap:12px}
    .a06-in h5{font-size:20px;font-weight:800;letter-spacing:-.03em;color:#f4f1eb;will-change:transform}
    .a06-in p{font-size:12.5px;color:#8a857c;line-height:1.6;will-change:transform}
    .a06-card{padding:12px 14px;border-radius:10px;background:#241e12;border:1px solid #3b3119;
      font-size:12px;color:#c8bfa6;will-change:transform}
    .a06-card.b{background:#362540;border-color:#55406b;color:#ded0b8}`,
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
  desc:'Uma corrente de pontos que se seguem — cada um mira no anterior.',
  tags:['canvas','trail','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a07"></canvas>`,
  css:`.a07{width:100%;height:100%;display:block;background:#090807;cursor:none}`,
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
  desc:'Integração de Verlet + colisão entre círculos. ~40 linhas, sem Matter.js.',
  tags:['física','verlet','anime.js'], stage:'flush', hint:'clique para soltar',
  html:`<canvas class="a08"></canvas>`,
  css:`.a08{width:100%;height:100%;display:block;background:#0d0c0b;cursor:pointer}`,
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
  desc:'blur + contrast num filtro SVG faz os blobs se fundirem como líquido.',
  tags:['SVG filter','goo','anime.js'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="a09">
      <svg width="0" height="0"><defs><filter id="a09goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/>
        <feColorMatrix in="b" mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" result="g"/>
        <feBlend in="SourceGraphic" in2="g"/>
      </filter></defs></svg>
      <div class="a09-w"></div>
    </div>`,
  css:`
    .a09{position:relative;width:100%;height:100%;overflow:hidden;background:#0a0908}
    .a09-w{position:absolute;inset:0;filter:url(#a09goo)}
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
  desc:'O tipo vira janela: background-clip:text com uma cena animada por trás (Anime.js).',
  tags:['background-clip','mask','anime.js'], stage:'flush', hint:'passe o mouse',
  html:`
    <div class="a10">
      <div class="a10-scene"></div>
      <h4 class="a10-t">CINEMA</h4>
      <span class="a10-s">o texto é a janela</span>
    </div>`,
  css:`
    .a10{position:relative;width:100%;height:100%;display:grid;place-items:center;background:#090807;overflow:hidden}
    .a10-scene{position:absolute;inset:-20%;
      background:
        radial-gradient(38% 44% at 22% 30%,#c9762f,transparent 60%),
        radial-gradient(42% 40% at 78% 26%,#b8871f,transparent 60%),
        radial-gradient(50% 46% at 50% 82%,#b08ac9,transparent 62%),
        linear-gradient(120deg,#2a2340,#1c2a1e);
      filter:blur(14px)}
    .a10-t{position:relative;z-index:2;font-size:52px;font-weight:800;letter-spacing:-.045em;
      color:#0d0c0b;mix-blend-mode:multiply}
    .a10::after{content:"";position:absolute;inset:0;z-index:1;background:#090807;
      -webkit-mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%);
      mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%)}
    .a10-s{position:absolute;bottom:16px;z-index:3;font-family:var(--mono);font-size:9.5px;
      letter-spacing:.24em;text-transform:uppercase;color:#66625a}`,
  js:function(root,ctx){
    var scene = root.querySelector('.a10-scene'),
        title = root.querySelector('.a10-t');
    anime({
      targets:scene,
      keyframes:[
        { scale:1.25, rotate:6 },
        { scale:1.1,  rotate:-5 }
      ],
      duration:11000, direction:'alternate', loop:true, easing:'easeInOutSine'
    });
    ctx.on(root,'mouseenter',function(){
      anime.remove(title);
      anime({ targets:title, letterSpacing:'0.02em', fontSize:56, duration:600, easing:'easeOutQuint' });
    });
    ctx.on(root,'mouseleave',function(){
      anime.remove(title);
      anime({ targets:title, letterSpacing:'-0.045em', fontSize:52, duration:600, easing:'easeOutQuint' });
    });
    ctx.clean(function(){ anime.remove(scene); anime.remove(title); });
  }
}

);
