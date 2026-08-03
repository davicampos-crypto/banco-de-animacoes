/* ==========================================================
   ENGINE B · WEB ANIMATIONS API
   Réplica de nav/fundos/estado/dados/avancado (47 itens)
   com el.animate() nativo — sem bibliotecas.
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'n01', cat:'nav', title:'Hambúrguer → X',
  desc:'Três traços viram um X. Quatro variações de morph (movimento via el.animate).',
  tags:['menu','transform','waapi'], hint:'clique nos ícones',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    // estado-alvo de cada traço, por variação (keyframe "to" implícito)
    var ON = {
      v1:[{transform:'translateY(7px) rotate(45deg)'},{opacity:0},{transform:'translateY(-7px) rotate(-45deg)'}],
      v2:[{transform:'translateY(7px) rotate(135deg)'},{transform:'scaleX(0)'},{transform:'translateY(-7px) rotate(-135deg)'}],
      v3:[{transform:'translateY(3.5px) rotate(45deg)'},{width:'20px',marginLeft:'0px',transform:'translateY(-3.5px) rotate(-45deg)'}],
      v4:[{width:'20px',transform:'translateY(7px) rotate(-45deg)'},{opacity:0,transform:'translateX(14px)'},{width:'20px',transform:'translateY(-7px) rotate(45deg)'}]
    };
    var OFF = {
      v1:[{transform:'none'},{opacity:1},{transform:'none'}],
      v2:[{transform:'none'},{transform:'none'},{transform:'none'}],
      v3:[{transform:'none'},{width:'13px',marginLeft:'-7px',transform:'none'}],
      v4:[{width:'14px',transform:'none'},{opacity:1,transform:'none'},{width:'9px',transform:'none'}]
    };
    root.querySelectorAll('.n01-b').forEach(function(b){
      var v = b.className.match(/v\d/)[0], on = false;
      ctx.on(b,'click',function(){
        on = !on;
        var alvo = on ? ON[v] : OFF[v];
        b.querySelectorAll('i').forEach(function(tr,k){
          anims.push(tr.animate(alvo[k], { duration:420, easing:EASE, fill:'forwards' }));
        });
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n02', cat:'nav', title:'Menu fullscreen com stagger',
  desc:'O painel entra por clip-path e os links sobem em cascata — tudo via WAAPI.',
  tags:['overlay','stagger','clip-path','waapi'], hint:'clique no menu',
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
      opacity:0;transform:translateY(24px)}
    .n02-p a:hover{transform:translateX(8px)}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var pane = root.querySelector('.n02-p'),
        bars = root.querySelectorAll('.n02-t i'),
        links = root.querySelectorAll('.n02-p a'),
        on = false;
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    ctx.on(root.querySelector('.n02-t'),'click',function(){
      on = !on;
      if (on){
        play(pane,{ clipPath:'circle(150% at calc(100% - 32px) 32px)' },
          { duration:700, easing:'cubic-bezier(.76,0,.24,1)', fill:'forwards' });
        links.forEach(function(a,i){
          play(a,[{ opacity:0, transform:'translateY(24px)' },{ opacity:1, transform:'none' }],
            { duration:500, delay:200 + i*70, easing:EASE, fill:'both' });
        });
        play(bars[0],{ transform:'translateY(4px) rotate(45deg)' },{ duration:400, easing:EASE, fill:'forwards' });
        play(bars[1],{ transform:'translateY(-4px) rotate(-45deg)' },{ duration:400, easing:EASE, fill:'forwards' });
      } else {
        play(pane,{ clipPath:'circle(0% at calc(100% - 32px) 32px)' },
          { duration:550, easing:'cubic-bezier(.76,0,.24,1)', fill:'forwards' });
        links.forEach(function(a){
          play(a,{ opacity:0, transform:'translateY(24px)' },{ duration:250, fill:'forwards' });
        });
        play(bars[0],{ transform:'none' },{ duration:400, easing:EASE, fill:'forwards' });
        play(bars[1],{ transform:'none' },{ duration:400, easing:EASE, fill:'forwards' });
      }
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n03', cat:'nav', title:'Drawer lateral com backdrop',
  desc:'Painel desliza, fundo escurece e desfoca — Animations com fill forwards.',
  tags:['drawer','backdrop-filter','slide','waapi'], hint:'clique em abrir',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var sh = root.querySelector('.n03-sh'),
        d  = root.querySelector('.n03-d'),
        labels = root.querySelectorAll('.n03-d label');
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function setOpen(o){
      sh.style.pointerEvents = o ? 'auto' : 'none';
      play(sh,{ opacity:o ? 1 : 0 },{ duration:400, fill:'forwards' });
      play(d,{ transform:o ? 'translateX(0%)' : 'translateX(100%)' },
        { duration:480, easing:EASE, fill:'forwards' });
      labels.forEach(function(l,i){
        if (o) play(l,[{ opacity:0, transform:'translateX(16px)' },{ opacity:1, transform:'none' }],
          { duration:400, delay:140 + i*60, easing:EASE, fill:'both' });
        else play(l,{ opacity:0, transform:'translateX(16px)' },{ duration:200, fill:'forwards' });
      });
    }
    ctx.on(root.querySelector('.n03-o'),'click',function(){ setOpen(true); });
    ctx.on(root.querySelector('.n03-c'),'click',function(){ setOpen(false); });
    ctx.on(sh,'click',function(){ setOpen(false); });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n04', cat:'nav', title:'Mega-menu',
  desc:'Abre com altura animada e itens escalonados via WAAPI. Fecha com delay.',
  tags:['dropdown','stagger','height','waapi'], hint:'passe o mouse',
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
      opacity:0;transform:translateY(8px);transition:color .15s}
    .n04-col span:hover{color:#fff}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var box = root.querySelector('.n04'),
        m = root.querySelector('.n04-m'),
        spans = root.querySelectorAll('.n04-col span'),
        t, open = false;
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function abrir(){
      if (open) return; open = true;
      play(m,{ maxHeight:'180px', opacity:1, paddingTop:'18px', paddingBottom:'18px' },
        { duration:450, easing:EASE, fill:'forwards' });
      spans.forEach(function(s,i){
        play(s,[{ opacity:0, transform:'translateY(8px)' },{ opacity:1, transform:'none' }],
          { duration:400, delay:(i % 3) * 60 + 60, easing:EASE, fill:'both' });
      });
    }
    function fechar(){
      if (!open) return; open = false;
      play(m,{ maxHeight:'0px', opacity:0, paddingTop:'0px', paddingBottom:'0px' },
        { duration:350, easing:EASE, fill:'forwards' });
      spans.forEach(function(s){
        play(s,{ opacity:0, transform:'translateY(8px)' },{ duration:200, fill:'forwards' });
      });
    }
    ctx.on(root.querySelector('.n04-tr'),'mouseenter',function(){ clearTimeout(t); abrir(); });
    ctx.on(box,'mouseleave',function(){ t = ctx.wait(fechar, 220); });
    ctx.on(m,'mouseenter',function(){ clearTimeout(t); });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n05', cat:'nav', title:'Tabs com indicador deslizante',
  desc:'O indicador mede a posição do botão ativo e anima com WAAPI.',
  tags:['tabs','FLIP','measure','waapi'], hint:'clique nas abas',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var ind = root.querySelector('.n05-ind'),
        btns = root.querySelectorAll('.n05-t button'),
        body = root.querySelector('.n05-body'),
        texts = ['O conteúdo troca com um fade curto.','Sessões, cliques e retenção.',
                 'Quem faz o quê, e desde quando.','Chaves, limites e webhooks.'];
    function move(b,animar){
      if (!animar){
        ind.style.width = b.offsetWidth + 'px';
        ind.style.transform = 'translateX(' + b.offsetLeft + 'px)';
        return;
      }
      anims.push(ind.animate(
        { width:b.offsetWidth + 'px', transform:'translateX(' + b.offsetLeft + 'px)' },
        { duration:420, easing:EASE, fill:'forwards' }));
    }
    move(root.querySelector('.n05-t button.on'), false);
    btns.forEach(function(b,i){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        move(b, true);
        body.innerHTML = '<b>' + b.textContent + '</b><p>' + texts[i] + '</p>';
        anims.push(body.animate([{ opacity:0, transform:'translateY(6px)' },{ opacity:1, transform:'none' }],
          { duration:350, easing:EASE }));
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n06', cat:'nav', title:'Accordion (altura medida)',
  desc:'A altura vai de 0 ao scrollHeight via WAAPI; o ícone anima com pseudoElement.',
  tags:['accordion','height','pseudoElement','waapi'], hint:'clique nos itens',
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
    .n06-i i::after{top:0;bottom:0;left:5px;width:1.6px}
    .n06-c{height:0;overflow:hidden}
    .n06-c p{margin:0;padding:0 14px 13px;font-size:11.5px;line-height:1.6;color:#8a857c}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function setOpen(it,open,dur){
      it.classList.toggle('open', open);
      var c = it.querySelector('.n06-c'), ic = it.querySelector('i');
      play(c,[{ height:c.offsetHeight + 'px' },{ height:(open ? c.scrollHeight : 0) + 'px' }],
        { duration:dur, easing:EASE, fill:'forwards' });
      play(ic,{ transform:open ? 'rotate(180deg)' : 'none' },
        { duration:dur, easing:EASE, fill:'forwards', pseudoElement:'::before' });
      play(ic,{ transform:open ? 'scaleY(0)' : 'none' },
        { duration:dur, easing:EASE, fill:'forwards', pseudoElement:'::after' });
    }
    setOpen(root.querySelector('.n06-i.open'), true, 1);   // estado inicial
    root.querySelectorAll('.n06-i button').forEach(function(b){
      ctx.on(b,'click',function(){
        var it = b.parentElement, was = it.classList.contains('open');
        root.querySelectorAll('.n06-i.open').forEach(function(x){ if (x !== it) setOpen(x, false, 450); });
        setOpen(it, !was, 450);
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n07', cat:'nav', title:'Modal com scale + backdrop',
  desc:'Entrada com mola, saída rápida — duas Animations distintas. Fecha no ESC.',
  tags:['modal','spring','ESC','waapi'], hint:'clique para abrir',
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
    .n07.on .n07-w{pointer-events:auto}
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
    var anims = [];
    var box = root.querySelector('.n07'),
        bd = root.querySelector('.n07-bd'),
        m = root.querySelector('.n07-m');
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function open(){
      box.classList.add('on');
      play(bd,{ opacity:1 },{ duration:300, fill:'forwards' });
      play(m,[{ opacity:0, transform:'scale(.9) translateY(10px)' },{ opacity:1, transform:'none' }],
        { duration:450, easing:'cubic-bezier(.34,1.56,.64,1)', fill:'forwards' });
    }
    function close(){
      box.classList.remove('on');
      play(bd,{ opacity:0 },{ duration:300, fill:'forwards' });
      play(m,{ opacity:0, transform:'scale(.9) translateY(10px)' },
        { duration:250, easing:'cubic-bezier(.65,0,.35,1)', fill:'forwards' });
    }
    ctx.on(root.querySelector('.n07-o'),'click',open);
    ctx.on(bd,'click',close);
    ctx.on(root.querySelector('.n07-a .c'),'click',close);
    ctx.on(root.querySelector('.n07-a .d'),'click',close);
    ctx.on(document,'keydown',function(e){ if (e.key === 'Escape') close(); });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n08', cat:'nav', title:'Toasts empilhando',
  desc:'Entram pela direita e saem sozinhos — entrada e saída são Animations.',
  tags:['toast','stack','timeout','waapi'], hint:'clique para disparar',
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
    var anims = [];
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
      anims.push(t.animate(
        [{ opacity:0, transform:'translateX(90px) scale(.9)' },{ opacity:1, transform:'none' }],
        { duration:450, easing:'cubic-bezier(.34,1.56,.64,1)', fill:'both' }));
      ctx.wait(function(){
        var out = t.animate({ opacity:0, transform:'translateX(60px) scale(.95)' },
          { duration:300, easing:'cubic-bezier(.65,0,.35,1)', fill:'forwards' });
        anims.push(out);
        out.onfinish = function(){ t.remove(); };
      }, 2600);
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n09', cat:'nav', title:'Bottom nav com bolha',
  desc:'A bolha desliza e o ícone sobe — transforms via el.animate com mola.',
  tags:['mobile','indicator','spring','waapi'], hint:'clique nos ícones',
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
    var anims = [], SPRING = 'cubic-bezier(.34,1.56,.64,1)';
    var bub = root.querySelector('.n09-bub'),
        btns = root.querySelectorAll('.n09-bar button');
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function ativa(b,on,dur){
      b.classList.toggle('on', on);
      play(b.querySelector('svg'),{ transform:on ? 'translateY(-6px) scale(1.05)' : 'none' },
        { duration:dur, easing:SPRING, fill:'forwards' });
      play(b.querySelector('b'),{ opacity:on ? 1 : 0, transform:on ? 'translateY(0)' : 'translateY(6px)' },
        { duration:dur, easing:SPRING, fill:'forwards' });
    }
    bub.style.transform = 'translateX(' + btns[0].offsetLeft + 'px)';
    ativa(btns[0], true, 1);
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ if (x !== b && x.classList.contains('on')) ativa(x, false, 300); });
        ativa(b, true, 450);
        play(bub,{ transform:'translateX(' + b.offsetLeft + 'px)' },
          { duration:500, easing:'cubic-bezier(.34,1.4,.64,1)', fill:'forwards' });
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n10', cat:'nav', title:'Dropdown com origem correta',
  desc:'transform-origin no canto do gatilho + itens em cascata, tudo com el.animate.',
  tags:['dropdown','transform-origin','stagger','waapi'], hint:'clique no botão',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var box = root.querySelector('.n10'),
        tr = root.querySelector('.n10-t'),
        caret = tr.querySelector('i'),
        m = root.querySelector('.n10-m'),
        lis = root.querySelectorAll('.n10-m li'),
        on = false;
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function setOpen(o){
      if (on === o) return; on = o;
      m.style.pointerEvents = o ? 'auto' : 'none';
      play(caret,{ transform:o ? 'rotate(180deg)' : 'none' },{ duration:350, easing:EASE, fill:'forwards' });
      if (o){
        play(m,[{ opacity:0, transform:'scale(.86) translateY(-6px)' },{ opacity:1, transform:'none' }],
          { duration:380, easing:'cubic-bezier(.34,1.4,.64,1)', fill:'both' });
        lis.forEach(function(li,i){
          play(li,[{ opacity:0, transform:'translateY(-5px)' },{ opacity:1, transform:'none' }],
            { duration:300, delay:50 + i*40, easing:EASE, fill:'both' });
        });
      } else {
        play(m,{ opacity:0, transform:'scale(.86) translateY(-6px)' },{ duration:200, fill:'forwards' });
        lis.forEach(function(li){
          play(li,{ opacity:0, transform:'translateY(-5px)' },{ duration:150, fill:'forwards' });
        });
      }
    }
    ctx.on(tr,'click',function(e){ e.stopPropagation(); setOpen(!on); });
    ctx.on(document,'click',function(){ setOpen(false); });
    lis.forEach(function(li){
      ctx.on(li,'click',function(){
        tr.firstChild.nodeValue = li.textContent + ' ';
        setOpen(false);
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'n11', cat:'nav', title:'Carrossel com drag e inércia',
  desc:'Drag segue o dedo via ctx.loop (WAAPI não serve p/ perseguição); dots animados com WAAPI.',
  tags:['drag','inertia','snap','waapi'], hint:'arraste ←→',
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
    .n11-dots i.on{width:18px;background:#d4af37}`,
  js:function(root,ctx){
    var anims = [];
    var box = root.querySelector('.n11'),
        tr = root.querySelector('.n11-tr'),
        dots = root.querySelectorAll('.n11-dots i'),
        W = 152;                                   // largura do slide + gap
    var x = 0, target = 0, down = false, sx = 0, sxa = 0, vel = 0, last = 0, max, li = 0;
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
      if (idx !== li){
        li = idx;
        dots.forEach(function(d,i){
          var on = i === idx;
          if (d.classList.contains('on') === on) return;
          d.classList.toggle('on', on);
          anims.push(d.animate(
            { width:on ? '18px' : '6px', backgroundColor:on ? '#d4af37' : '#302c24' },
            { duration:350, fill:'forwards' }));
        });
      }
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'f01', cat:'fundos', title:'Mesh gradient animado',
  desc:'Quatro radiais em blur, cada uma num loop alternado de WAAPI (iterations:Infinity).',
  tags:['radial-gradient','blur','waapi'], stage:'flush',
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
    var anims = [];
    var moves = [
      ['translate(90px,70px) scale(1.25)', 9000],
      ['translate(-70px,-60px) scale(1.15)', 11000],
      ['translate(-90px,90px) scale(.85)', 13000],
      ['translate(80px,-70px) scale(1.2)', 10000]
    ];
    root.querySelectorAll('.f01 i').forEach(function(el,i){
      anims.push(el.animate(
        [{ transform:'none' },{ transform:moves[i][0] }],
        { duration:moves[i][1], direction:'alternate', iterations:Infinity, easing:'ease-in-out' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'f02', cat:'fundos', title:'Blobs orgânicos',
  desc:'border-radius de 8 valores animado com WAAPI; delays negativos defasam os blobs.',
  tags:['border-radius','morph','waapi'],
  html:`<div class="f02"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>`,
  css:`
    .f02{position:relative;width:200px;height:200px;display:grid;place-items:center}
    .f02 i{position:absolute;width:150px;height:150px;mix-blend-mode:screen;
      border-radius:62% 38% 46% 54%/54% 46% 62% 38%}
    .f02 .b1{background:linear-gradient(140deg,#d4af37,#b8871f)}
    .f02 .b2{background:linear-gradient(140deg,#b08ac9,#6f4f86);transform:scale(.85)}
    .f02 .b3{background:linear-gradient(140deg,#5cc88f,#2f7d55);transform:scale(.7)}`,
  js:function(root,ctx){
    var anims = [];
    var frames = [
      { borderRadius:'62% 38% 46% 54%/54% 46% 62% 38%', rotate:'0deg',   offset:0 },
      { borderRadius:'38% 62% 63% 37%/41% 64% 36% 59%', rotate:'120deg', offset:.33 },
      { borderRadius:'55% 45% 32% 68%/70% 33% 67% 30%', rotate:'240deg', offset:.66 },
      { borderRadius:'62% 38% 46% 54%/54% 46% 62% 38%', rotate:'0deg',   offset:1 }
    ];
    var delays = { b1:0, b2:-2600, b3:-5200 };
    root.querySelectorAll('.f02 i').forEach(function(el){
      anims.push(el.animate(frames, {
        duration:8000, delay:delays[el.className], iterations:Infinity, easing:'ease-in-out'
      }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'f03', cat:'fundos', title:'Constelação de partículas',
  desc:'Pontos ligados por linhas; o mouse os empurra. (Canvas frame a frame — WAAPI não anima pixels; ctx.loop mantido.)',
  tags:['canvas','particles','rAF','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'Cada ponto cresce e é atraído pelo cursor. (Canvas frame a frame — WAAPI não anima pixels; ctx.loop mantido.)',
  tags:['canvas','grid','mouse','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'Faixas em blur com rotação lenta — cada faixa é uma Animation infinita alternada.',
  tags:['blur','blend-mode','waapi'], stage:'flush',
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
    var anims = [];
    var faixas = [
      ['translateY(24px) rotate(-6deg) scaleY(1.5)', 8000, 'alternate'],
      ['translateY(-30px) rotate(5deg) scaleY(1.8)', 11000, 'alternate-reverse'],
      ['translateY(-50px) rotate(-4deg) scaleY(1.3)', 9000, 'alternate']
    ];
    root.querySelectorAll('.f05 i').forEach(function(el,i){
      anims.push(el.animate(
        [{ transform:'none' },{ transform:faixas[i][0] }],
        { duration:faixas[i][1], direction:faixas[i][2], iterations:Infinity, easing:'ease-in-out' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'f06', cat:'fundos', title:'Grain / ruído de filme',
  desc:'Ruído gerado em canvas e reciclado a ~12fps. (Textura por frame — WAAPI não se aplica; ctx.every mantido.)',
  tags:['canvas','noise','overlay','waapi'], stage:'flush',
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
  desc:'Três paths em fase diferente — cada onda é uma Animation infinita alternada.',
  tags:['SVG','wave','loop','waapi'], stage:'flush',
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
    var anims = [];
    var ondas = [['.w1', 7000, 'alternate'], ['.w2', 5000, 'alternate-reverse'], ['.w3', 9000, 'alternate']];
    ondas.forEach(function(o){
      anims.push(root.querySelector(o[0]).animate(
        [{ transform:'translateX(0) scaleY(1)' },{ transform:'translateX(-14%) scaleY(1.18)' }],
        { duration:o[1], direction:o[2], iterations:Infinity, easing:'ease-in-out' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'f08', cat:'fundos', title:'Starfield / hiperespaço',
  desc:'Projeção em perspectiva no canvas. (Frame a frame — WAAPI não se aplica; ctx.loop mantido.)',
  tags:['canvas','3D','projection','waapi'], stage:'flush', hint:'mova o mouse p/ acelerar',
  html:`<canvas class="f08"></canvas>`,
  css:`.f08{width:100%;height:100%;display:block;background:#060504;cursor:crosshair}`,
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
  desc:'Ripples concêntricos com decaimento. (Canvas frame a frame — WAAPI não se aplica; ctx.loop mantido.)',
  tags:['canvas','ripple','click','waapi'], stage:'flush', hint:'clique no quadro',
  html:`<canvas class="f09"></canvas>`,
  css:`.f09{width:100%;height:100%;display:block;background:radial-gradient(60% 70% at 50% 40%,#201c12,#0a0908);cursor:pointer}`,
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
  desc:'Máscara radial segue o cursor via CSS vars — posicionamento direto, sem tween a substituir.',
  tags:['mask','radial-gradient','mouse','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'Três estados encadeados só com el.animate: largura, spinner infinito e check por dashoffset.',
  tags:['loading','state machine','SVG','waapi'], hint:'clique',
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
    .x01 .sp{opacity:0}
    .x01 .ck{opacity:0;transform:scale(.6)}
    .x01 .sp{width:20px;height:20px;border:2.5px solid rgba(7,18,28,.25);border-top-color:#1b1813;
      border-radius:50%}
    .x01 .ck{width:24px;height:24px;fill:none;stroke:#052e22;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .x01 .ck path{stroke-dasharray:26;stroke-dashoffset:26}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)', SPRING = 'cubic-bezier(.34,1.56,.64,1)';
    var b = root.querySelector('.x01'),
        t = b.querySelector('.t'),
        sp = b.querySelector('.sp'),
        ck = b.querySelector('.ck'),
        path = ck.querySelector('path'),
        busy = false, spin = null;
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    ctx.on(b,'click',function(){
      if (busy) return; busy = true;
      // 1) carregando: encolhe e gira
      play(b,{ width:'46px', borderRadius:'50%' },{ duration:450, easing:EASE, fill:'forwards' });
      play(t,{ opacity:0, transform:'scale(.8)' },{ duration:250, fill:'forwards' });
      play(sp,{ opacity:1 },{ duration:250, fill:'forwards' });
      spin = sp.animate([{ transform:'rotate(0deg)' },{ transform:'rotate(360deg)' }],
        { duration:700, iterations:Infinity });
      anims.push(spin);
      ctx.wait(function(){
        // 2) ok: verde + check desenhado
        spin.cancel();
        play(sp,{ opacity:0 },{ duration:150, fill:'forwards' });
        play(b,{ backgroundColor:'#5cc88f' },{ duration:350, fill:'forwards' });
        play(ck,{ opacity:1, transform:'none' },{ duration:350, easing:SPRING, fill:'forwards' });
        play(path,[{ strokeDashoffset:26 },{ strokeDashoffset:0 }],
          { duration:450, delay:100, easing:'cubic-bezier(.65,0,.35,1)', fill:'forwards' });
        ctx.wait(function(){
          // 3) volta ao repouso
          play(b,{ width:'170px', borderRadius:'12px', backgroundColor:'#d4af37' },
            { duration:450, easing:EASE, fill:'forwards' });
          play(ck,{ opacity:0, transform:'scale(.6)' },{ duration:200, fill:'forwards' });
          play(t,{ opacity:1, transform:'none' },{ duration:300, delay:150, easing:SPRING, fill:'forwards' });
          busy = false;
        }, 2200);
      }, 1600);
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x02', cat:'estado', title:'Shake de erro',
  desc:'Sacudida curta e assimétrica com keyframes de offsets no el.animate. Nunca passe de 400ms.',
  tags:['error','shake','validation','waapi'], hint:'clique em entrar',
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
    .x02-f.bad small{opacity:1;transform:none}
    .x02-f.bad input{border-color:#e5645f;background:#1d1216}
    .x02 button{padding:11px;border-radius:10px;background:#d4af37;color:#1b1813;font-weight:700;font-size:13px;margin-top:4px}`,
  js:function(root,ctx){
    var anims = [];
    var SHAKE = [
      { transform:'translateX(0)' },
      { transform:'translateX(-2px)', offset:.1 },
      { transform:'translateX(4px)',  offset:.2 },
      { transform:'translateX(-7px)', offset:.3 },
      { transform:'translateX(7px)',  offset:.4 },
      { transform:'translateX(-7px)', offset:.5 },
      { transform:'translateX(7px)',  offset:.6 },
      { transform:'translateX(-7px)', offset:.7 },
      { transform:'translateX(4px)',  offset:.8 },
      { transform:'translateX(-2px)', offset:.9 },
      { transform:'translateX(0)' }
    ];
    var fs = root.querySelectorAll('.x02-f');
    ctx.on(root.querySelector('button'),'click',function(){
      fs.forEach(function(f,i){
        ctx.wait(function(){
          f.classList.add('bad');
          anims.push(f.querySelector('input').animate(SHAKE,
            { duration:380, easing:'cubic-bezier(.36,.07,.19,.97)' }));
          anims.push(f.querySelector('small').animate(
            [{ opacity:0, transform:'translateY(-4px)' },{ opacity:1, transform:'none' }],
            { duration:250, fill:'forwards' }));
        }, i * 90);
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x03', cat:'estado', title:'Label flutuante',
  desc:'Focus/blur/input disparam uma Animation no label (a versão CSS usa :placeholder-shown).',
  tags:['form','label','waapi'], hint:'clique e digite',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    root.querySelectorAll('.x03-f').forEach(function(f){
      var inp = f.querySelector('input'), lb = f.querySelector('label');
      function update(dur){
        var ativo = document.activeElement === inp || inp.value !== '';
        anims.push(lb.animate(
          { transform:ativo ? 'translateY(-9px) scale(.76)' : 'none',
            color:ativo ? '#d4af37' : '#736f68' },
          { duration:dur, easing:EASE, fill:'forwards' }));
      }
      update(1);                                   // estado inicial (campo preenchido)
      ctx.on(inp,'focus',function(){ update(280); });
      ctx.on(inp,'blur',function(){ update(280); });
      ctx.on(inp,'input',function(){ update(280); });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x04', cat:'estado', title:'Like com explosão de partículas',
  desc:'Coração com mola + 8 partículas radiais — cada uma é uma Animation com onfinish.',
  tags:['burst','spring','particles','waapi'], hint:'clique no coração',
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
    .x04-b svg{width:30px;height:30px;fill:none;stroke:#736f68;stroke-width:1.8;transition:stroke .25s,fill .25s}
    .x04-b.on svg{fill:#e5645f;stroke:#e5645f}
    .x04-p{position:absolute;width:5px;height:5px;border-radius:50%;pointer-events:none}
    .x04-n{font-size:15px;font-weight:700;color:#ccc7bc;font-variant-numeric:tabular-nums;
      transition:color .3s}
    .x04-n.on{color:#e5645f}`,
  js:function(root,ctx){
    var anims = [];
    var b = root.querySelector('.x04-b'),
        svg = b.querySelector('svg'),
        n = root.querySelector('.x04-n'), v = 128;
    ctx.on(b,'click',function(){
      var on = b.classList.toggle('on');
      n.classList.toggle('on', on);
      n.textContent = (v += on ? 1 : -1);
      if (!on) return;
      anims.push(svg.animate([
        { transform:'scale(1)' },
        { transform:'scale(.82)', offset:.35 },
        { transform:'scale(1.25)', offset:.7 },
        { transform:'scale(1)' }
      ],{ duration:550, easing:'cubic-bezier(.34,1.56,.64,1)' }));
      for (var i = 0; i < 9; i++){
        var s = document.createElement('span'), a = (i/9) * Math.PI * 2, d = 26 + Math.random()*14;
        s.className = 'x04-p';
        s.style.background = ['#e5645f','#cf9b6a','#e8c96a'][i%3];
        b.appendChild(s);
        var burst = s.animate([
          { transform:'translate(0,0) scale(1)', opacity:1 },
          { transform:'translate(' + (Math.cos(a)*d).toFixed(1) + 'px,' + (Math.sin(a)*d).toFixed(1) + 'px) scale(0)', opacity:0 }
        ],{ duration:620, delay:i*8, easing:'cubic-bezier(.22,1,.36,1)', fill:'forwards' });
        burst.onfinish = (function(el){ return function(){ el.remove(); }; })(s);
        anims.push(burst);
      }
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x05', cat:'estado', title:'Toggle com física',
  desc:'A bolinha (pseudo-elemento) anima via el.animate com pseudoElement e mola.',
  tags:['toggle','spring','pseudoElement','waapi'], hint:'clique',
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
    .x05-s i::after{content:"";display:block;width:26px;height:26px;border-radius:99px;background:#fff}
    .x05-s.alt i::after{border-radius:9px}`,
  js:function(root,ctx){
    var anims = [], SPRING = 'cubic-bezier(.34,1.5,.5,1)';
    root.querySelectorAll('.x05-s').forEach(function(s){
      var inp = s.querySelector('input'), i = s.querySelector('i');
      var onBg = s.classList.contains('alt') ? '#b08ac9' : '#5cc88f';
      function knob(x,wd,dur){
        anims.push(i.animate({ transform:'translateX(' + x + 'px)', width:wd },
          { duration:dur, easing:SPRING, fill:'forwards', pseudoElement:'::after' }));
      }
      i.style.background = inp.checked ? onBg : '#2a2620';
      knob(inp.checked ? 28 : 0, '26px', 1);
      ctx.on(inp,'change',function(){
        anims.push(i.animate({ backgroundColor:inp.checked ? onBg : '#2a2620' },
          { duration:350, fill:'forwards' }));
        knob(inp.checked ? 28 : 0, '26px', 480);
      });
      ctx.on(s,'pointerdown',function(){ knob(inp.checked ? 20 : 0, '34px', 300); });  // squash
      ctx.on(s,'pointerup',function(){ knob(inp.checked ? 28 : 0, '26px', 480); });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x06', cat:'estado', title:'Copiar com confirmação',
  desc:'O ícone morfa para check e o rótulo desliza — pares de Animations que se desfazem em 1,6s.',
  tags:['clipboard','morph','feedback','waapi'], hint:'clique em copiar',
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
      stroke-linejoin:round;grid-area:1/1}
    .x06-b .i1,.x06-b .i2{display:block}
    .x06-b svg{position:absolute}
    .x06-b{position:relative;padding-left:34px}
    .x06-b svg{left:13px;top:50%;margin-top:-7.5px}
    .x06-b .i2{opacity:0;transform:scale(.5) rotate(-30deg)}
    .x06-b span{display:block;height:1.35em;overflow:hidden}
    .x06-b i{display:block;height:1.35em;line-height:1.35em;font-style:normal}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)', SPRING = 'cubic-bezier(.34,1.56,.64,1)';
    var b = root.querySelector('.x06-b'),
        i1 = b.querySelector('.i1'), i2 = b.querySelector('.i2'),
        rotulos = b.querySelectorAll('span i'),
        txt = root.querySelector('.x06-c').textContent;
    function play(el,kf,opt){ var a = el.animate(kf,opt); anims.push(a); return a; }
    function estado(ok){
      b.classList.toggle('ok', ok);
      play(i1,{ opacity:ok ? 0 : 1, transform:ok ? 'scale(.5) rotate(30deg)' : 'none' },
        { duration:350, easing:SPRING, fill:'forwards' });
      play(i2,{ opacity:ok ? 1 : 0, transform:ok ? 'none' : 'scale(.5) rotate(-30deg)' },
        { duration:350, easing:SPRING, fill:'forwards' });
      rotulos.forEach(function(r){
        play(r,{ transform:ok ? 'translateY(-100%)' : 'none' },
          { duration:400, easing:EASE, fill:'forwards' });
      });
    }
    ctx.on(b,'click',function(){
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function(){});
      estado(true);
      ctx.wait(function(){ estado(false); }, 1600);
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x07', cat:'estado', title:'Drag & drop com placeholder',
  desc:'Drag segue o ponteiro direto; a entrada e o encaixe da solta são Animations com mola.',
  tags:['drag','pointer events','drop','waapi'], hint:'arraste os cards',
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
    var anims = [], SPRING = 'cubic-bezier(.34,1.56,.64,1)';
    var cur = null, ph = null, ox = 0, oy = 0;
    root.querySelectorAll('.x07-i').forEach(function(it,i){
      anims.push(it.animate([{ transform:'scale(.94)', opacity:0 },{ transform:'none', opacity:1 }],
        { duration:400, delay:i*60, easing:SPRING, fill:'both' }));
    });
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
      anims.push(cur.animate([{ transform:'scale(.94)', opacity:.6 },{ transform:'none', opacity:1 }],
        { duration:400, easing:SPRING }));
      root.querySelectorAll('.x07-col').forEach(function(c){ c.classList.remove('hot'); });
      cur = null;
    }
    ctx.on(root,'pointerdown',grab);
    ctx.on(root,'pointermove',move);
    ctx.on(root,'pointerup',drop);
    ctx.on(root,'pointercancel',drop);
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x08', cat:'estado', title:'Reorder de lista com FLIP',
  desc:'First-Last-Invert-Play: mede antes e depois e anima a diferença com el.animate.',
  tags:['FLIP','reorder','performance','waapi'], hint:'clique em embaralhar',
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
    var anims = [];
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
        anims.push(el.animate(
          [{ transform:'translateY(' + d + 'px)' }, { transform:'none' }],
          { duration:520, easing:'cubic-bezier(.22,1,.36,1)' }
        ));
      });
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x09', cat:'estado', title:'Pull to refresh',
  desc:'O arrasto segue o ponteiro; a soltura, o loading e o item novo são Animations.',
  tags:['pull','pointer','mobile','waapi'], hint:'arraste para baixo',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var box = root.querySelector('.x09'),
        list = root.querySelector('.x09-list'),
        ind = root.querySelector('.x09-ind'),
        icon = ind.querySelector('svg'),
        y0 = 0, d = 0, down = false, busy = false, n = 5,
        la = null, ia = null, spin = null;      // animations "seguras" p/ cancelar
    function glide(el,kf){
      var a = el.animate(kf,{ duration:450, easing:EASE, fill:'forwards' });
      anims.push(a); return a;
    }
    ctx.on(box,'pointerdown',function(e){
      if (busy) return; down = true; y0 = e.clientY; box.setPointerCapture(e.pointerId);
      if (la) la.cancel(); if (ia) ia.cancel();     // libera o inline style p/ o drag
      list.style.transform = ''; ind.style.opacity = 0; ind.style.transform = '';
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
      if (d > 48){
        busy = true;
        spin = icon.animate([{ transform:'rotate(0deg)' },{ transform:'rotate(360deg)' }],
          { duration:800, iterations:Infinity });
        anims.push(spin);
        la = glide(list,{ transform:'translateY(34px)' });
        ia = glide(ind,{ transform:'translateY(14px)', opacity:1 });
        ctx.wait(function(){
          var r = document.createElement('div');
          r.className = 'x09-r';
          r.innerHTML = '<i></i><span>Item novo #' + (++n) + '</span>';
          list.prepend(r);
          anims.push(r.animate([{ opacity:0, transform:'translateY(-12px)' },{ opacity:1, transform:'none' }],
            { duration:500, easing:EASE }));
          la = glide(list,{ transform:'translateY(0px)' });
          ia = glide(ind,{ transform:'translateY(0px)', opacity:0 });
          spin.cancel(); icon.style.transform = '';
          busy = false;
        }, 1200);
      } else {
        la = glide(list,{ transform:'translateY(0px)' });
        ia = glide(ind,{ transform:'translateY(0px)', opacity:0 });
      }
      d = 0;
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'x10', cat:'estado', title:'UI otimista',
  desc:'O item entra "pendente" com uma Animation; o pulso do ponto usa pseudoElement.',
  tags:['optimistic','pending','UX','waapi'], hint:'clique em adicionar',
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
    var anims = [];
    var ul = root.querySelector('.x10-l'), n = 0;
    var nomes = ['Revisar contrato','Subir para produção','Ligar pro cliente','Fechar sprint'];
    ctx.on(root.querySelector('.x10-b'),'click',function(){
      var li = document.createElement('li');
      li.className = 'pend';
      li.innerHTML = '<b>' + nomes[n++ % nomes.length] + '</b><s>salvando</s>';
      ul.prepend(li);
      anims.push(li.animate(
        [{ opacity:0, transform:'translateY(-8px) scale(.97)' },{ opacity:.55, transform:'none' }],
        { duration:450, easing:'cubic-bezier(.22,1,.36,1)' }));
      var pulso = li.querySelector('b').animate(
        [{ opacity:.3 },{ opacity:1, offset:.5 },{ opacity:.3 }],
        { duration:900, iterations:Infinity, easing:'ease-in-out', pseudoElement:'::after' });
      anims.push(pulso);
      ctx.wait(function(){
        pulso.cancel();
        li.classList.remove('pend');
        li.querySelector('s').textContent = 'ok';
      }, 1200 + Math.random() * 700);
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'d01', cat:'dados', title:'Barras crescendo',
  desc:'Altura animada com stagger via el.animate (fill both) e o valor subindo junto.',
  tags:['chart','stagger','waapi'], hint:'passe o mouse',
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
      color:#948f86;opacity:0;bottom:calc(var(--v) * .87%)}
    .d01-b:hover b{color:#d4af37}
    .d01-b small{position:absolute;bottom:-18px;left:0;right:0;text-align:center;font-size:9.5px;color:#66625a}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    root.querySelectorAll('.d01-b').forEach(function(b,i){
      var v = +b.style.getPropertyValue('--v');
      anims.push(b.querySelector('i').animate(
        [{ height:'0%' },{ height:(v * .87) + '%' }],
        { duration:1000, delay:80 + i*90, easing:EASE, fill:'both' }));
      anims.push(b.querySelector('b').animate(
        [{ opacity:0, transform:'none' },{ opacity:1, transform:'translateY(-4px)' }],
        { duration:500, delay:80 + i*90, easing:EASE, fill:'both' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'d02', cat:'dados', title:'Donut desenhando',
  desc:'stroke-dashoffset animado com el.animate em cada arco + contador no centro.',
  tags:['SVG','donut','dashoffset','waapi'],
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var C = 2 * Math.PI * 50;                        // circunferência
    var segs = [{ el:'.a', v:.46, off:0 }, { el:'.b', v:.28, off:.46 }, { el:'.c', v:.14, off:.74 }];
    segs.forEach(function(s,i){
      var el = root.querySelector(s.el);
      el.style.strokeDasharray = C;
      el.style.strokeDashoffset = C;
      el.style.transform = 'rotate(' + (s.off * 360) + 'deg)';
      el.style.transformOrigin = '60px 60px';
      anims.push(el.animate(
        [{ strokeDashoffset:C },{ strokeDashoffset:C * (1 - s.v) }],
        { duration:1100, delay:120 + i*260, easing:EASE, fill:'both' }));
    });
    // contador central via rAF (poderia ser uma Animation num proxy)
    var out = root.querySelector('.d02-mid b'), t0 = null, to = 88;
    function f(t){
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1700);
      out.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) ctx.raf(f);
    }
    ctx.raf(f);
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'d03', cat:'dados', title:'Linha se desenhando + área',
  desc:'Path traçado por dashoffset, área em fade e pontos em cascata — só el.animate.',
  tags:['SVG','path','area','waapi'],
  html:`<svg class="d03" viewBox="0 0 260 130" preserveAspectRatio="none"></svg>`,
  css:`
    .d03{width:250px;height:130px;overflow:visible}
    .d03 .grid{stroke:#1d1d28;stroke-width:1}
    .d03 .area{fill:url(#d03g);opacity:0}
    .d03 .line{fill:none;stroke:#d4af37;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .d03 .dot{fill:#0d0c0b;stroke:#d4af37;stroke-width:2.2;opacity:0;
      transform-box:fill-box;transform-origin:center;transform:scale(0)}`,
  js:function(root,ctx){
    var anims = [], SPRING = 'cubic-bezier(.34,1.56,.64,1)';
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

    var line = svg.querySelector('.line'), L = line.getTotalLength();
    line.style.strokeDasharray = L;
    anims.push(line.animate([{ strokeDashoffset:L },{ strokeDashoffset:0 }],
      { duration:1500, delay:80, easing:'cubic-bezier(.65,0,.35,1)', fill:'both' }));
    anims.push(svg.querySelector('.area').animate([{ opacity:0 },{ opacity:1 }],
      { duration:800, delay:580, easing:'ease', fill:'both' }));
    svg.querySelectorAll('.dot').forEach(function(dot,i){
      anims.push(dot.animate(
        [{ opacity:0, transform:'scale(0)' },{ opacity:1, transform:'scale(1)' }],
        { duration:450, delay:780 + i*70, easing:SPRING, fill:'both' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'d04', cat:'dados', title:'Tooltip que segue o dado',
  desc:'A cada ponto mais próximo, uma Animation curta leva o marcador até lá (substituindo a anterior).',
  tags:['chart','tooltip','hover','waapi'], hint:'passe o mouse',
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
      background:#0d0c0b;border:2.2px solid #b08ac9;top:0;margin-top:-4.5px}
    .d04-tip{position:absolute;top:-4px;left:0;padding:5px 9px;border-radius:8px;background:#f0ede7;color:#0e0d0c;
      font-size:11px;font-weight:700;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s}
    .d04-tip span{font-weight:400;color:#635f58;margin-left:5px}
    .d04:hover .d04-cur,.d04:hover .d04-tip{opacity:1}`,
  js:function(root,ctx){
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
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

    var aCur = null, aDot = null, aTip = null;
    function slide(el, kf, prev, opt){
      if (prev) prev.cancel();
      var a = el.animate(kf, opt || { duration:180, easing:EASE, fill:'forwards' });
      anims.push(a); return a;
    }
    var lastI = -1;
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * W;
      var i = Math.max(0, Math.min(pts.length - 1, Math.round(x / step)));
      if (i === lastI) return;
      lastI = i;
      var px = pts[i][0] / W * r.width, py = pts[i][1] / H * r.height;
      aCur = slide(cur,{ transform:'translateX(' + px + 'px)' }, aCur);
      aDot = slide(cur,{ top:py + 'px' }, aDot,
        { duration:180, easing:EASE, fill:'forwards', pseudoElement:'::after' });
      tip.innerHTML = '<b>R$ ' + vals[i].toLocaleString('pt-BR') + '</b><span>' + meses[i] + '</span>';
      aTip = slide(tip,{ transform:'translate(' + Math.min(r.width - 100, Math.max(0, px - 40)) + 'px,' + Math.max(0, py - 34) + 'px)' }, aTip);
    });
    ctx.on(box,'mouseleave',function(){ lastI = -1; });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'d05', cat:'dados', title:'Transição entre datasets',
  desc:'Interpolação dos valores via ctx.loop — o path do SVG muda a cada frame, coisa que WAAPI não faz.',
  tags:['morph','interpolate','rAF','waapi'], hint:'clique para trocar',
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
  desc:'Cada célula é uma Animation com delay diagonal — leitura guiada, célula a célula.',
  tags:['heatmap','stagger','grid','waapi'],
  html:`<div class="d06"></div>`,
  css:`
    .d06{display:grid;grid-template-columns:repeat(14,1fr);gap:4px;width:250px}
    .d06 i{aspect-ratio:1;border-radius:3px;background:#1c1a15;
      transform:scale(.3);opacity:0;
      transition:transform .2s,filter .2s}
    .d06 i:hover{transform:scale(1.35);filter:brightness(1.5);z-index:2}`,
  js:function(root,ctx){
    var anims = [], SPRING = 'cubic-bezier(.34,1.56,.64,1)';
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
    box.querySelectorAll('i').forEach(function(cel,k){
      var c = k % C, r = (k / C) | 0;
      anims.push(cel.animate(
        [{ transform:'scale(.3)', opacity:0 },{ transform:'scale(1)', opacity:1 }],
        { duration:500, delay:(c + r) * 34, easing:SPRING, fill:'both' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
},

{
  id:'a01', cat:'avancado', title:'Objeto 3D em CSS puro',
  desc:'Cubo com preserve-3d arrastável. (Física de arrasto por frame — WAAPI não persegue o ponteiro; ctx.loop mantido.)',
  tags:['3D','preserve-3d','drag','waapi'], hint:'arraste o cubo',
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
  desc:'Fatias deslocadas por onda centrada no cursor. (Canvas frame a frame — WAAPI não anima pixels; ctx.loop mantido.)',
  tags:['canvas','displacement','slices','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'Propagação de ondas em dois buffers de pixels. (Simulação por frame — WAAPI não se aplica; ctx.loop mantido.)',
  tags:['canvas','simulation','pixels','waapi'], stage:'flush', hint:'clique e arraste',
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
  desc:'Grade repetida por módulo nos dois eixos. (Perseguição do ponteiro por frame — ctx.loop mantido.)',
  tags:['drag','infinite','modulo','waapi'], stage:'flush', hint:'arraste em qualquer direção',
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
  desc:'Interpolação ponto a ponto do atributo d. (WAAPI não anima atributos de path — ctx.loop mantido.)',
  tags:['SVG','morph','interpolate','waapi'], hint:'clique nas formas',
  html:`
    <div class="a05">
      <svg viewBox="0 0 200 200"><path class="a05-p"/></svg>
      <div class="a05-btns"><button class="on">estrela</button><button>flor</button><button>engrenagem</button></div>
    </div>`,
  css:`
    .a05{display:flex;flex-direction:column;align-items:center;gap:10px}
    .a05 svg{width:150px;height:150px}
    .a05-p{fill:url(#none);fill:#d4af37;filter:drop-shadow(0 6px 18px #d4af3733)}
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
  desc:'A rolagem exibida persegue a real com lerp. (Alvo muda a cada frame — ctx.loop mantido.)',
  tags:['lerp','smooth scroll','parallax','waapi'], stage:'scroll flush', hint:'role ↓',
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
  desc:'Corrente de pontos que se seguem. (Canvas frame a frame — WAAPI não anima pixels; ctx.loop mantido.)',
  tags:['canvas','trail','chain','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'Verlet + colisão entre círculos. (Simulação por frame — WAAPI não se aplica; ctx.loop mantido.)',
  tags:['física','verlet','colisão','waapi'], stage:'flush', hint:'clique para soltar',
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
  desc:'blur + contrast fundem os blobs. (Atração ao cursor calculada por frame — ctx.loop mantido.)',
  tags:['SVG filter','goo','blend','waapi'], stage:'flush', hint:'mova o mouse',
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
  desc:'O tipo vira janela: a cena de fundo é uma Animation infinita e o hover anima o tipo via WAAPI.',
  tags:['background-clip','mask','scale','waapi'], stage:'flush', hint:'passe o mouse',
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
    var anims = [], EASE = 'cubic-bezier(.22,1,.36,1)';
    var box = root.querySelector('.a10'),
        scene = root.querySelector('.a10-scene'),
        t = root.querySelector('.a10-t');
    anims.push(scene.animate([
      { transform:'scale(1) rotate(0deg)' },
      { transform:'scale(1.25) rotate(6deg)', offset:.5 },
      { transform:'scale(1.1) rotate(-5deg)' }
    ],{ duration:11000, direction:'alternate', iterations:Infinity, easing:'ease-in-out' }));
    ctx.on(box,'mouseenter',function(){
      anims.push(t.animate({ letterSpacing:'.02em', fontSize:'56px' },
        { duration:600, easing:EASE, fill:'forwards' }));
    });
    ctx.on(box,'mouseleave',function(){
      anims.push(t.animate({ letterSpacing:'-.045em', fontSize:'52px' },
        { duration:600, easing:EASE, fill:'forwards' }));
    });
    ctx.clean(function(){ anims.forEach(function(a){ a.cancel(); }); });
  }
}

);
