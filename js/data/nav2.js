/* ==========================================================
   06b · NAVEGAÇÃO & UI — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'nx01', cat:'nav', title:'Command palette (⌘K)',
  desc:'Fundo desfoca, o painel cai com mola e a lista filtra a cada tecla.',
  tags:['⌘K','blur','filtro'], stage:'flush', hint:'clique para abrir e digite',
  html:`
    <div class="nx01">
      <div class="nx01-bg"><b>Dashboard</b><p>Aperte o botão ou ⌘K</p><button class="nx01-o">⌘ K</button></div>
      <div class="nx01-w">
        <div class="nx01-p">
          <input class="nx01-in" placeholder="Digite um comando…">
          <ul class="nx01-l"></ul>
        </div>
      </div>
    </div>`,
  css:`
    .nx01{position:relative;width:100%;height:100%;overflow:hidden}
    .nx01-bg{height:100%;display:grid;place-content:center;text-align:center;gap:6px;background:#121110;
      transition:filter .35s,transform .35s}
    .nx01.on .nx01-bg{filter:blur(3px) brightness(.55);transform:scale(.98)}
    .nx01-bg b{font-size:17px;color:#f1eee8}
    .nx01-bg p{font-size:12px;color:#85807a}
    .nx01-o{margin-top:6px;padding:7px 16px;border-radius:8px;background:#242019;border:1px solid #34301f;
      color:#e8e5df;font-family:var(--mono);font-size:11.5px}
    .nx01-w{position:absolute;inset:0;display:flex;justify-content:center;padding-top:26px;
      opacity:0;pointer-events:none;transition:opacity .25s}
    .nx01.on .nx01-w{opacity:1;pointer-events:auto}
    .nx01-p{width:230px;height:max-content;border-radius:13px;background:#1c1a15;border:1px solid #34301f;
      box-shadow:0 30px 60px -30px #000;overflow:hidden;
      transform:translateY(-14px) scale(.95);transition:transform .42s cubic-bezier(.34,1.4,.64,1)}
    .nx01.on .nx01-p{transform:none}
    .nx01-in{width:100%;padding:12px 14px;background:transparent;border:0;border-bottom:1px solid #28241900;
      border-bottom:1px solid #262219;color:#f1eee8;font-size:13px;outline:0}
    .nx01-l{list-style:none;margin:0;padding:6px;max-height:120px;overflow-y:auto}
    .nx01-l li{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:7px;font-size:12px;
      color:#a7a299;animation:nx01 .28s cubic-bezier(.22,1,.36,1) both}
    .nx01-l li:first-child,.nx01-l li:hover{background:#22201a;color:#fff}
    .nx01-l s{text-decoration:none;font-size:11px;opacity:.65}
    .nx01-l em{margin-left:auto;font-family:var(--mono);font-size:9px;color:#66625a;font-style:normal}
    @keyframes nx01{from{opacity:0;transform:translateY(-5px)}}`,
  js:function(root,ctx){
    var box = root.querySelector('.nx01'),
        inp = root.querySelector('.nx01-in'),
        lst = root.querySelector('.nx01-l');
    var cmds = [['◈','Novo projeto','⌘N'],['⇪','Importar arquivos','⌘I'],['⌗','Buscar na base','⌘F'],
                ['◑','Alternar tema','⌘J'],['⚙','Preferências','⌘,'],['↩','Sair da conta','']];
    function pintar(q){
      q = (q || '').toLowerCase();
      var f = cmds.filter(function(c){ return c[1].toLowerCase().indexOf(q) > -1; });
      lst.innerHTML = f.length
        ? f.map(function(c,i){
            return '<li style="animation-delay:' + (i*28) + 'ms"><s>' + c[0] + '</s>' + c[1] +
                   '<em>' + c[2] + '</em></li>'; }).join('')
        : '<li>nenhum comando</li>';
    }
    function abrir(){ box.classList.add('on'); inp.value = ''; pintar(''); inp.focus(); }
    function fechar(){ box.classList.remove('on'); }
    pintar('');
    ctx.on(root.querySelector('.nx01-o'),'click',abrir);
    ctx.on(inp,'input',function(){ pintar(inp.value); });
    ctx.on(root.querySelector('.nx01-w'),'click',function(e){ if (e.target === this) fechar(); });
    ctx.on(document,'keydown',function(e){
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); abrir(); }
      if (e.key === 'Escape') fechar();
    });
  }
});

add({
  id:'nx02', cat:'nav', title:'Bottom sheet com snap points',
  desc:'Arraste e solte: ele escolhe a parada mais próxima entre fechado, meio e cheio.',
  tags:['sheet','snap','drag'], stage:'flush', hint:'arraste a alça',
  html:`
    <div class="nx02">
      <div class="nx02-bg"><b>Mapa</b></div>
      <div class="nx02-sh">
        <div class="nx02-grab"></div>
        <b>Restaurantes perto</b>
        <div class="nx02-r"><i></i>Cantina do Nino · 240m</div>
        <div class="nx02-r"><i></i>Padaria Real · 380m</div>
        <div class="nx02-r"><i></i>Bar do Zé · 610m</div>
        <div class="nx02-r"><i></i>Sushi Ten · 900m</div>
      </div>
    </div>`,
  css:`
    .nx02{position:relative;width:100%;height:100%;overflow:hidden;background:#141312}
    .nx02-bg{height:100%;display:grid;place-items:center;color:#302b24;font-size:26px;font-weight:800;
      background:repeating-linear-gradient(45deg,#12121c 0 12px,#221d13 12px 24px)}
    .nx02-sh{position:absolute;left:0;right:0;bottom:0;height:200px;border-radius:16px 16px 0 0;
      background:#201d18;border:1px solid #2c2820;border-bottom:0;padding:8px 16px 16px;
      touch-action:none;will-change:transform;box-shadow:0 -20px 50px -30px #000}
    .nx02-grab{width:38px;height:4px;border-radius:9px;background:#3d3729;margin:0 auto 12px;cursor:grab}
    .nx02-sh b{font-size:13.5px;color:#f4f1eb}
    .nx02-r{display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1px solid #23201a;
      font-size:12px;color:#a7a299}
    .nx02-r i{width:7px;height:7px;border-radius:50%;background:#d4af37;flex:none}`,
  js:function(root,ctx){
    var sh = root.querySelector('.nx02-sh');
    var H = 200, snaps = [H - 34, H - 118, 0];        // fechado, meio, cheio (translateY)
    var y = snaps[0], down = false, sy = 0, base = 0;
    function ir(v){
      sh.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
      y = v; sh.style.transform = 'translateY(' + y + 'px)';
    }
    ir(snaps[0]);
    ctx.on(sh,'pointerdown',function(e){
      down = true; sy = e.clientY; base = y;
      sh.style.transition = 'none'; sh.setPointerCapture(e.pointerId);
    });
    ctx.on(sh,'pointermove',function(e){
      if (!down) return;
      y = Math.max(0, Math.min(H - 20, base + (e.clientY - sy)));
      sh.style.transform = 'translateY(' + y + 'px)';
    });
    ctx.on(sh,'pointerup',function(){
      if (!down) return;
      down = false;
      var perto = snaps.reduce(function(a,b){ return Math.abs(b - y) < Math.abs(a - y) ? b : a; });
      ir(perto);
    });
  }
});

add({
  id:'nx03', cat:'nav', title:'Segmented control arrastável',
  desc:'Além de clicar, dá para arrastar a bolha — ela acompanha o dedo e encaixa ao soltar.',
  tags:['segmented','drag','snap'], hint:'clique ou arraste a bolha',
  html:`
    <div class="nx03">
      <div class="nx03-c"><span class="nx03-b"></span>
        <button class="on">Dia</button><button>Semana</button><button>Mês</button>
      </div>
      <small class="nx03-o">Dia</small>
    </div>`,
  css:`
    .nx03{display:flex;flex-direction:column;gap:12px;align-items:center}
    .nx03-c{position:relative;display:flex;padding:4px;border-radius:11px;background:#1b1915;border:1px solid #262219;
      touch-action:none}
    .nx03-b{position:absolute;top:4px;bottom:4px;left:4px;border-radius:8px;background:#d4af37;
      transition:transform .38s cubic-bezier(.34,1.4,.64,1),width .38s cubic-bezier(.34,1.4,.64,1)}
    .nx03-b.drag{transition:none}
    .nx03-c button{position:relative;z-index:2;padding:8px 18px;font-size:12px;color:#8f8a80;
      transition:color .25s;cursor:grab}
    .nx03-c button.on{color:#1b1813;font-weight:600}
    .nx03-o{font-family:var(--mono);font-size:11px;color:#66625a}`,
  js:function(root,ctx){
    var wrap = root.querySelector('.nx03-c'),
        bub = root.querySelector('.nx03-b'),
        btns = [].slice.call(root.querySelectorAll('.nx03-c button')),
        out = root.querySelector('.nx03-o'),
        down = false, i = 0;

    function ir(k){
      i = Math.max(0, Math.min(btns.length - 1, k));
      var b = btns[i];
      bub.classList.remove('drag');
      bub.style.width = b.offsetWidth + 'px';
      bub.style.transform = 'translateX(' + (b.offsetLeft - 4) + 'px)';
      btns.forEach(function(x,j){ x.classList.toggle('on', j === i); });
      out.textContent = b.textContent;
    }
    ir(0);
    btns.forEach(function(b,k){ ctx.on(b,'click',function(){ if (!down) ir(k); }); });

    ctx.on(wrap,'pointerdown',function(e){ down = true; wrap.setPointerCapture(e.pointerId); });
    ctx.on(wrap,'pointermove',function(e){
      if (!down) return;
      var r = wrap.getBoundingClientRect(), x = e.clientX - r.left;
      bub.classList.add('drag');
      bub.style.transform = 'translateX(' + Math.max(0, Math.min(r.width - bub.offsetWidth - 8, x - bub.offsetWidth/2)) + 'px)';
      var alvo = btns.findIndex(function(b){ return x >= b.offsetLeft && x <= b.offsetLeft + b.offsetWidth; });
      if (alvo > -1){ btns.forEach(function(x2,j){ x2.classList.toggle('on', j === alvo); }); out.textContent = btns[alvo].textContent; }
    });
    ctx.on(wrap,'pointerup',function(e){
      if (!down) return;
      down = false;
      var r = wrap.getBoundingClientRect(), x = e.clientX - r.left;
      var alvo = btns.findIndex(function(b){ return x >= b.offsetLeft && x <= b.offsetLeft + b.offsetWidth; });
      ir(alvo > -1 ? alvo : i);
    });
  }
});

add({
  id:'nx04', cat:'nav', title:'Stepper com progresso',
  desc:'A linha entre os passos preenche e o círculo concluído troca o número por um check.',
  tags:['wizard','stepper','progresso'], hint:'clique em avançar',
  html:`
    <div class="nx04">
      <div class="nx04-s">
        <div class="nx04-line"><i></i></div>
        <div class="nx04-p on"><b>1</b><span>Dados</span></div>
        <div class="nx04-p"><b>2</b><span>Entrega</span></div>
        <div class="nx04-p"><b>3</b><span>Pagar</span></div>
        <div class="nx04-p"><b>4</b><span>Fim</span></div>
      </div>
      <div class="nx04-a"><button class="prev">Voltar</button><button class="next">Avançar</button></div>
    </div>`,
  css:`
    .nx04{width:250px}
    .nx04-s{position:relative;display:flex;justify-content:space-between;padding:0 4px}
    .nx04-line{position:absolute;left:18px;right:18px;top:13px;height:2px;background:#242119}
    .nx04-line i{display:block;height:100%;width:0;background:#d4af37;
      transition:width .5s cubic-bezier(.22,1,.36,1)}
    .nx04-p{position:relative;z-index:2;text-align:center;width:56px}
    .nx04-p b{display:grid;place-items:center;width:28px;height:28px;margin:0 auto;border-radius:50%;
      background:#1b1915;border:2px solid #2b2721;font-size:11.5px;color:#85807a;
      transition:all .4s cubic-bezier(.34,1.56,.64,1)}
    .nx04-p span{display:block;margin-top:6px;font-size:10px;color:#66625a;transition:color .3s}
    .nx04-p.on b{border-color:#d4af37;color:#d4af37;background:#141210}
    .nx04-p.on span{color:#c6c1b6}
    .nx04-p.done b{background:#d4af37;border-color:#d4af37;color:#1b1813;font-size:0}
    .nx04-p.done b::after{content:"✓";font-size:13px}
    .nx04-a{display:flex;gap:8px;margin-top:22px}
    .nx04-a button{flex:1;padding:9px;border-radius:9px;font-size:12px;font-weight:600}
    .nx04-a .prev{background:#22201a;color:#bdb8ad}
    .nx04-a .next{background:#d4af37;color:#1b1813}`,
  js:function(root,ctx){
    var ps = root.querySelectorAll('.nx04-p'), bar = root.querySelector('.nx04-line i'), k = 0;
    function pintar(){
      ps.forEach(function(p,i){
        p.classList.toggle('done', i < k);
        p.classList.toggle('on', i === k);
      });
      bar.style.width = (k / (ps.length - 1) * 100) + '%';
    }
    pintar();
    ctx.on(root.querySelector('.next'),'click',function(){ k = Math.min(ps.length - 1, k + 1); pintar(); });
    ctx.on(root.querySelector('.prev'),'click',function(){ k = Math.max(0, k - 1); pintar(); });
  }
});

add({
  id:'nx05', cat:'nav', title:'Sidebar colapsável',
  desc:'Largura anima, os rótulos somem escalonados e os ícones ficam centralizados.',
  tags:['sidebar','width','stagger'], stage:'flush', hint:'clique na seta',
  html:`
    <div class="nx05">
      <aside class="nx05-sb">
        <button class="nx05-t">‹</button>
        <a class="on"><i>◧</i><b>Painel</b></a>
        <a><i>◔</i><b>Métricas</b></a>
        <a><i>◈</i><b>Projetos</b></a>
        <a><i>☰</i><b>Tarefas</b></a>
        <a><i>⚙</i><b>Ajustes</b></a>
      </aside>
      <div class="nx05-c"><b>Conteúdo</b><p>A área útil acompanha a largura.</p></div>
    </div>`,
  css:`
    .nx05{display:flex;width:100%;height:100%;background:#121110}
    .nx05-sb{position:relative;width:132px;flex:none;padding:12px 8px;background:#1a1814;
      border-right:1px solid #23201a;transition:width .42s cubic-bezier(.22,1,.36,1)}
    .nx05.min .nx05-sb{width:52px}
    .nx05-t{position:absolute;right:-11px;top:14px;width:22px;height:22px;border-radius:50%;
      background:#22201a;border:1px solid #34301f;color:#c6c1b6;font-size:12px;z-index:3;
      transition:transform .42s cubic-bezier(.22,1,.36,1)}
    .nx05.min .nx05-t{transform:rotate(180deg)}
    .nx05-sb a{display:flex;align-items:center;gap:10px;padding:9px;border-radius:8px;color:#8f8a80;
      font-size:12.5px;cursor:pointer;margin-top:6px;transition:background .2s,color .2s}
    .nx05-sb a:first-of-type{margin-top:26px}
    .nx05-sb a.on,.nx05-sb a:hover{background:#201e18;color:#f1eee8}
    .nx05-sb i{font-style:normal;width:18px;text-align:center;flex:none}
    .nx05-sb b{font-weight:500;white-space:nowrap;transition:opacity .3s,transform .35s cubic-bezier(.22,1,.36,1)}
    .nx05.min .nx05-sb b{opacity:0;transform:translateX(-8px)}
    .nx05.min a:nth-of-type(1) b{transition-delay:0s}
    .nx05.min a:nth-of-type(2) b{transition-delay:.03s}
    .nx05.min a:nth-of-type(3) b{transition-delay:.06s}
    .nx05.min a:nth-of-type(4) b{transition-delay:.09s}
    .nx05.min a:nth-of-type(5) b{transition-delay:.12s}
    .nx05-c{padding:20px 16px}
    .nx05-c b{font-size:14px;color:#f1eee8}
    .nx05-c p{font-size:12px;color:#85807a;margin-top:5px}`,
  js:function(root,ctx){
    var box = root.querySelector('.nx05');
    ctx.on(root.querySelector('.nx05-t'),'click',function(){ box.classList.toggle('min'); });
  }
});

add({
  id:'nx06', cat:'nav', title:'Menu radial',
  desc:'Os itens abrem em leque a partir do botão, cada um com seu ângulo e atraso.',
  tags:['radial','trigonometria','stagger'], hint:'clique no +',
  html:`
    <div class="nx06">
      <div class="nx06-w">
        <button class="nx06-fab">+</button>
        <button class="nx06-i" data-a="180">✎</button>
        <button class="nx06-i" data-a="216">◷</button>
        <button class="nx06-i" data-a="252">☁</button>
        <button class="nx06-i" data-a="288">♥</button>
        <button class="nx06-i" data-a="324">✦</button>
      </div>
    </div>`,
  css:`
    .nx06{width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:26px}
    .nx06-w{position:relative;width:56px;height:56px}
    .nx06-fab{position:absolute;inset:0;border-radius:50%;background:#d4af37;color:#1b1813;
      font-size:24px;font-weight:300;z-index:3;box-shadow:0 10px 24px -10px #d4af3788;
      transition:transform .42s cubic-bezier(.34,1.56,.64,1)}
    .nx06.on .nx06-fab{transform:rotate(135deg)}
    .nx06-i{position:absolute;left:10px;top:10px;width:36px;height:36px;border-radius:50%;
      background:#221f19;border:1px solid #34301f;color:#c6c1b6;font-size:14px;
      transform:translate(0,0) scale(.4);opacity:0;
      transition:transform .48s cubic-bezier(.34,1.5,.64,1),opacity .3s}
    .nx06.on .nx06-i{opacity:1;transform:translate(var(--x),var(--y)) scale(1)}
    .nx06-i:hover{background:#2b2721;color:#fff}`,
  js:function(root,ctx){
    var box = root.querySelector('.nx06');
    root.querySelectorAll('.nx06-i').forEach(function(b,i){
      var a = +b.dataset.a * Math.PI / 180, R = 74;
      b.style.setProperty('--x', (Math.cos(a) * R).toFixed(1) + 'px');
      b.style.setProperty('--y', (Math.sin(a) * R).toFixed(1) + 'px');
      b.style.transitionDelay = (i * 40) + 'ms';
    });
    ctx.on(root.querySelector('.nx06-fab'),'click',function(){ box.classList.toggle('on'); });
  }
});

add({
  id:'nx07', cat:'nav', title:'Badge de notificação',
  desc:'Chegou item novo: o número troca com salto, o sino balança e a aura pulsa.',
  tags:['badge','pulso','sino'], hint:'clique no sino',
  html:`
    <div class="nx07">
      <button class="nx07-b">
        <svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        <span class="nx07-n">3</span>
        <em class="nx07-p"></em>
      </button>
      <small>clique para chegar mais uma</small>
    </div>`,
  css:`
    .nx07{display:flex;flex-direction:column;gap:14px;align-items:center}
    .nx07-b{position:relative;width:54px;height:54px;display:grid;place-items:center;border-radius:14px;
      background:#1c1a15;border:1px solid #2b2721}
    .nx07-b svg{width:24px;height:24px;fill:none;stroke:#ccc7bc;stroke-width:1.8;stroke-linecap:round;
      stroke-linejoin:round;transform-origin:50% 18%}
    .nx07-b.ring svg{animation:nx07r .7s cubic-bezier(.36,.07,.19,.97)}
    .nx07-n{position:absolute;top:6px;right:6px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;
      background:#e5645f;color:#2a0710;font-size:10px;font-weight:800;display:grid;place-items:center;
      font-variant-numeric:tabular-nums}
    .nx07-b.ring .nx07-n{animation:nx07n .5s cubic-bezier(.34,1.56,.64,1)}
    .nx07-p{position:absolute;top:6px;right:6px;width:17px;height:17px;border-radius:9px;background:#e5645f;
      opacity:0}
    .nx07-b.ring .nx07-p{animation:nx07p .9s ease-out}
    .nx07 small{font-size:11px;color:#66625a}
    @keyframes nx07r{0%,100%{transform:rotate(0)}20%{transform:rotate(15deg)}
      45%{transform:rotate(-12deg)}70%{transform:rotate(7deg)}}
    @keyframes nx07n{0%{transform:scale(1)}40%{transform:scale(1.45)}100%{transform:scale(1)}}
    @keyframes nx07p{from{opacity:.7;transform:scale(1)}to{opacity:0;transform:scale(2.6)}}`,
  js:function(root,ctx){
    var b = root.querySelector('.nx07-b'), n = root.querySelector('.nx07-n'), v = 3;
    ctx.on(b,'click',function(){
      v++; b.classList.remove('ring'); void b.offsetWidth; b.classList.add('ring');
      ctx.wait(function(){ n.textContent = v > 99 ? '99+' : v; }, 120);
    });
  }
});

add({
  id:'nx08', cat:'nav', title:'Toast com timer visível',
  desc:'A barra mostra quanto falta para sumir — e pausa enquanto o mouse está em cima.',
  tags:['toast','timer','pause'], hint:'clique e passe o mouse',
  html:`
    <div class="nx08">
      <button class="nx08-go">Salvar alterações</button>
      <div class="nx08-st"></div>
    </div>`,
  css:`
    .nx08{position:relative;width:100%;height:100%;display:grid;place-items:center;padding:14px}
    .nx08-go{padding:10px 18px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12.5px;font-weight:700}
    .nx08-st{position:absolute;left:12px;right:12px;bottom:12px;display:flex;flex-direction:column;gap:8px}
    .nx08-t{position:relative;overflow:hidden;padding:11px 13px 13px;border-radius:10px;background:#211e18;
      border:1px solid #332e21;font-size:12px;color:#e9e5dc;
      animation:nx08in .42s cubic-bezier(.34,1.56,.64,1) both}
    .nx08-t.out{animation:nx08out .3s ease forwards}
    .nx08-t small{display:block;font-size:10.5px;color:#8f8a80;margin-top:2px}
    .nx08-t i{position:absolute;left:0;bottom:0;height:2.5px;background:#d4af37;width:100%;
      transform-origin:0 50%;animation:nx08bar 4s linear forwards}
    .nx08-t:hover i{animation-play-state:paused}
    @keyframes nx08in{from{opacity:0;transform:translateY(16px) scale(.96)}}
    @keyframes nx08out{to{opacity:0;transform:translateY(10px) scale(.97)}}
    @keyframes nx08bar{to{transform:scaleX(0)}}`,
  js:function(root,ctx){
    var st = root.querySelector('.nx08-st');
    ctx.on(root.querySelector('.nx08-go'),'click',function(){
      if (st.children.length > 1) st.removeChild(st.firstChild);
      var t = document.createElement('div');
      t.className = 'nx08-t';
      t.innerHTML = 'Alterações salvas<small>passe o mouse para pausar o timer</small><i></i>';
      st.appendChild(t);
      var bar = t.querySelector('i');
      bar.addEventListener('animationend', function(){
        t.classList.add('out');
        t.addEventListener('animationend', function(){ t.remove(); });
      });
    });
  }
});

add({
  id:'nx09', cat:'nav', title:'Infinite scroll com sentinela',
  desc:'Um elemento invisível no fim da lista dispara o carregamento antes de o usuário chegar lá.',
  tags:['sentinela','IntersectionObserver','paginação'], stage:'scroll flush', hint:'role até o fim',
  html:`
    <div class="nx09">
      <div class="nx09-l"></div>
      <div class="nx09-end">
        <div class="nx09-sk"></div><div class="nx09-sk"></div>
      </div>
    </div>`,
  css:`
    .nx09-l{padding:12px}
    .nx09-r{display:flex;align-items:center;gap:10px;padding:11px 12px;margin-bottom:7px;border-radius:9px;
      background:#1f1c17;border:1px solid #2a2620;font-size:12.5px;color:#dad5cb;
      animation:nx09 .45s cubic-bezier(.22,1,.36,1) both}
    .nx09-r i{width:26px;height:26px;border-radius:7px;flex:none}
    .nx09-end{padding:0 12px 16px}
    .nx09-sk{height:44px;border-radius:9px;background:#1c1a15;margin-bottom:7px;position:relative;overflow:hidden}
    .nx09-sk::after{content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
      transform:translateX(-100%);animation:nx09s 1.2s ease-in-out infinite}
    @keyframes nx09{from{opacity:0;transform:translateY(12px)}}
    @keyframes nx09s{to{transform:translateX(100%)}}`,
  js:function(root,ctx){
    var lista = root.querySelector('.nx09-l'),
        fim = root.querySelector('.nx09-end'),
        cores = ['#2b2618','#362540','#1e352a','#3f2a1d','#2c2822'],
        n = 0, carregando = false;

    function lote(){
      carregando = true;
      ctx.wait(function(){
        for (var i = 0; i < 6; i++){
          var r = document.createElement('div');
          r.className = 'nx09-r';
          r.style.animationDelay = (i * 45) + 'ms';
          r.innerHTML = '<i style="background:' + cores[n % 5] + '"></i>Registro ' + String(++n).padStart(3,'0');
          lista.appendChild(r);
        }
        carregando = false;
        if (n >= 30){ fim.innerHTML = '<p style="text-align:center;font-size:11px;color:#66625a">fim da lista</p>'; io.disconnect(); }
      }, 700);
    }
    var io = new IntersectionObserver(function(es){
      if (es[0].isIntersecting && !carregando) lote();
    }, { root: root.closest('.stage'), rootMargin:'120px' });
    io.observe(fim);
    ctx.clean(function(){ io.disconnect(); });
    lote();
  }
});

add({
  id:'nx10', cat:'nav', title:'Breadcrumb animado',
  desc:'Ao entrar num nível, o novo item desliza; ao voltar, os seguintes colapsam de largura.',
  tags:['breadcrumb','width','navegação'], hint:'clique nas pastas',
  html:`
    <div class="nx10">
      <div class="nx10-bc"></div>
      <div class="nx10-fs"></div>
    </div>`,
  css:`
    .nx10{width:240px}
    .nx10-bc{display:flex;align-items:center;flex-wrap:wrap;gap:2px;min-height:26px;margin-bottom:12px}
    .nx10-bc b{max-width:140px;overflow:hidden;white-space:nowrap;padding:4px 8px;border-radius:7px;
      font-size:11.5px;font-weight:500;color:#a5a099;background:#1d1b16;cursor:pointer;
      animation:nx10 .38s cubic-bezier(.22,1,.36,1) both}
    .nx10-bc b:last-child{color:#d4af37;background:#d4af3718}
    .nx10-bc s{text-decoration:none;color:#524e47;font-size:10px}
    .nx10-fs{display:flex;flex-wrap:wrap;gap:6px}
    .nx10-fs button{display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:9px;
      background:#1b1915;border:1px solid #24211a;font-size:11.5px;color:#c6c1b6;
      animation:nx10 .4s cubic-bezier(.22,1,.36,1) both}
    .nx10-fs button:hover{background:#242019}
    @keyframes nx10{from{opacity:0;max-width:0;transform:translateX(-6px)}}`,
  js:function(root,ctx){
    var bc = root.querySelector('.nx10-bc'), fs = root.querySelector('.nx10-fs');
    var arvore = { 'Home':['Projetos','Clientes'], 'Projetos':['2024','2025'], 'Clientes':['Ativos'],
                   '2025':['Aurora','Nebula'], '2024':[], 'Ativos':[], 'Aurora':[], 'Nebula':[] };
    var caminho = ['Home'];
    function pintar(){
      bc.innerHTML = caminho.map(function(p,i){
        return (i ? '<s>›</s>' : '') + '<b data-i="' + i + '" style="animation-delay:' + (i*40) + 'ms">' + p + '</b>';
      }).join('');
      var filhos = arvore[caminho[caminho.length-1]] || [];
      fs.innerHTML = filhos.length
        ? filhos.map(function(f,i){ return '<button style="animation-delay:' + (i*50) + 'ms">▸ ' + f + '</button>'; }).join('')
        : '<p style="font-size:11.5px;color:#66625a">pasta vazia</p>';
      fs.querySelectorAll('button').forEach(function(b){
        b.addEventListener('click', function(){ caminho.push(b.textContent.slice(2)); pintar(); });
      });
      bc.querySelectorAll('b').forEach(function(b){
        b.addEventListener('click', function(){ caminho = caminho.slice(0, +b.dataset.i + 1); pintar(); });
      });
    }
    pintar();
  }
});

add({
  id:'nx11', cat:'nav', title:'Popover que se reposiciona',
  desc:'Se não cabe embaixo, vira para cima; se vaza na lateral, desliza para dentro.',
  tags:['popover','flip','shift'], stage:'flush', hint:'clique nos pontos',
  html:`
    <div class="nx11">
      <button class="nx11-d" style="left:16px;top:16px"></button>
      <button class="nx11-d" style="right:16px;top:20px"></button>
      <button class="nx11-d" style="left:50%;bottom:18px"></button>
      <button class="nx11-d" style="left:16px;bottom:22px"></button>
      <div class="nx11-p"><b>Popover</b><p>Sempre dentro do quadro.</p></div>
    </div>`,
  css:`
    .nx11{position:relative;width:100%;height:100%;overflow:hidden;background:#121110}
    .nx11-d{position:absolute;width:14px;height:14px;border-radius:50%;background:#d4af37;
      box-shadow:0 0 0 4px #d4af3722;transition:transform .25s}
    .nx11-d:hover{transform:scale(1.2)}
    .nx11-p{position:absolute;left:0;top:0;width:150px;padding:10px 12px;border-radius:10px;
      background:#f0ede7;color:#171510;box-shadow:0 14px 34px -16px #000;
      opacity:0;transform:scale(.9);pointer-events:none;
      transition:opacity .2s,transform .34s cubic-bezier(.34,1.4,.64,1),left .3s,top .3s}
    .nx11-p.on{opacity:1;transform:none}
    .nx11-p b{font-size:12.5px}
    .nx11-p p{font-size:11px;color:#5d5952;margin-top:2px}`,
  js:function(root,ctx){
    var box = root.querySelector('.nx11'), p = root.querySelector('.nx11-p'), atual = null;
    root.querySelectorAll('.nx11-d').forEach(function(d){
      ctx.on(d,'click',function(e){
        e.stopPropagation();
        if (atual === d){ p.classList.remove('on'); atual = null; return; }
        atual = d;
        var r = box.getBoundingClientRect(), b = d.getBoundingClientRect();
        var x = b.left - r.left, y = b.top - r.top;
        var w = p.offsetWidth, h = p.offsetHeight;
        // flip vertical se não couber embaixo
        var top = (y + b.height + 10 + h < r.height) ? y + b.height + 10 : y - h - 10;
        // shift horizontal para não vazar
        var left = Math.max(8, Math.min(r.width - w - 8, x + b.width/2 - w/2));
        p.style.left = left + 'px'; p.style.top = Math.max(8, top) + 'px';
        p.classList.add('on');
      });
    });
    ctx.on(box,'click',function(){ p.classList.remove('on'); atual = null; });
  }
});

add({
  id:'nx12', cat:'nav', title:'Carrossel com scroll-snap nativo',
  desc:'Sem JS de arrasto: o navegador faz o snap e a inércia. O JS só move e marca os pontos.',
  tags:['scroll-snap','scrollBy','nativo'], hint:'arraste ou use as setas',
  html:`
    <div class="nx12">
      <div class="nx12-tr">
        <div class="nx12-s" style="--c:#2b2618">01</div><div class="nx12-s" style="--c:#362540">02</div>
        <div class="nx12-s" style="--c:#1e352a">03</div><div class="nx12-s" style="--c:#3f2a1d">04</div>
        <div class="nx12-s" style="--c:#2c2822">05</div>
      </div>
      <div class="nx12-c">
        <button class="p">‹</button><div class="nx12-dots"></div><button class="n">›</button>
      </div>
    </div>`,
  css:`
    .nx12{width:250px}
    .nx12-tr{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;
      padding-bottom:4px;scroll-behavior:smooth}
    .nx12-tr::-webkit-scrollbar{display:none}
    .nx12-s{flex:none;width:150px;height:104px;border-radius:12px;background:var(--c);scroll-snap-align:center;
      display:grid;place-items:center;font-family:var(--mono);font-size:19px;color:#ffffff55;
      border:1px solid #ffffff12}
    .nx12-c{display:flex;align-items:center;gap:10px;margin-top:12px}
    .nx12-c button{width:28px;height:28px;border-radius:8px;background:#221f19;border:1px solid #2e2a22;
      color:#c6c1b6;font-size:14px;transition:.2s}
    .nx12-c button:hover{background:#2b2721;color:#fff}
    .nx12-dots{flex:1;display:flex;gap:5px;justify-content:center}
    .nx12-dots i{width:6px;height:6px;border-radius:9px;background:#302c24;transition:all .3s}
    .nx12-dots i.on{width:16px;background:#d4af37}`,
  js:function(root,ctx){
    var tr = root.querySelector('.nx12-tr'),
        slides = root.querySelectorAll('.nx12-s'),
        dots = root.querySelector('.nx12-dots');
    dots.innerHTML = Array.prototype.map.call(slides, function(){ return '<i></i>'; }).join('');
    var pts = dots.querySelectorAll('i');
    function marcar(){
      var i = Math.round(tr.scrollLeft / 160);
      pts.forEach(function(d,j){ d.classList.toggle('on', j === i); });
    }
    marcar();
    ctx.on(tr,'scroll',marcar,{ passive:true });
    ctx.on(root.querySelector('.p'),'click',function(){ tr.scrollBy({ left:-160 }); });
    ctx.on(root.querySelector('.n'),'click',function(){ tr.scrollBy({ left:160 }); });
  }
});

})();
