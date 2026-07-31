/* ==========================================================
   08 · ESTADO & FEEDBACK
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'x01', cat:'estado', title:'Botão: enviar → carregando → ok',
  desc:'Três estados numa largura que se ajusta. O check é desenhado no SVG.',
  tags:['loading','state machine','SVG'], hint:'clique',
  html:`
    <button class="x01">
      <span class="t">Enviar pedido</span>
      <span class="sp"></span>
      <svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
    </button>`,
  css:`
    .x01{position:relative;display:grid;place-items:center;height:46px;width:170px;border-radius:12px;
      background:#d4af37;color:#1b1813;font-size:13.5px;font-weight:700;overflow:hidden;
      transition:width .45s cubic-bezier(.22,1,.36,1),background .35s,border-radius .45s}
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
  desc:'Sacudida curta e assimétrica + borda vermelha. Nunca passe de 400ms.',
  tags:['error','shake','validation'], hint:'clique em entrar',
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
      opacity:0;transform:translateY(-4px);transition:all .25s}
    .x02-f.bad small{opacity:1;transform:none}
    .x02-f.bad input{border-color:#e5645f;background:#1d1216;animation:x02 .38s cubic-bezier(.36,.07,.19,.97)}
    .x02 button{padding:11px;border-radius:10px;background:#d4af37;color:#1b1813;font-weight:700;font-size:13px;margin-top:4px}
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
  desc:':placeholder-shown resolve tudo em CSS puro, sem JS de estado.',
  tags:['form',':placeholder-shown','CSS only'], hint:'clique e digite',
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
      transform-origin:0 0;transition:transform .28s cubic-bezier(.22,1,.36,1),color .25s}
    .x03 input:focus + label,
    .x03 input:not(:placeholder-shown) + label{transform:translateY(-9px) scale(.76);color:#d4af37}`
},

{
  id:'x04', cat:'estado', title:'Like com explosão de partículas',
  desc:'Coração com mola + 8 partículas radiais geradas na hora.',
  tags:['burst','spring','particles'], hint:'clique no coração',
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
      transition:stroke .25s,fill .25s,transform .4s cubic-bezier(.34,1.56,.64,1)}
    .x04-b.on svg{fill:#e5645f;stroke:#e5645f;animation:x04 .55s cubic-bezier(.34,1.56,.64,1)}
    .x04-p{position:absolute;width:5px;height:5px;border-radius:50%;pointer-events:none;
      animation:x04p .62s cubic-bezier(.22,1,.36,1) forwards}
    .x04-n{font-size:15px;font-weight:700;color:#ccc7bc;font-variant-numeric:tabular-nums;
      transition:color .3s}
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
  desc:'A bolinha estica no meio do caminho (squash) e assenta com mola.',
  tags:['toggle','spring','squash'], hint:'clique',
  html:`
    <div class="x05">
      <label class="x05-s"><input type="checkbox" checked><i></i></label>
      <label class="x05-s alt"><input type="checkbox"><i></i></label>
    </div>`,
  css:`
    .x05{display:flex;flex-direction:column;gap:18px;align-items:center}
    .x05-s{cursor:pointer}
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
  desc:'O ícone morfa para check e o rótulo desliza. Volta sozinho em 1,6s.',
  tags:['clipboard','morph','feedback'], hint:'clique em copiar',
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
      stroke-linejoin:round;grid-area:1/1;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1)}
    .x06-b .i1,.x06-b .i2{display:block}
    .x06-b svg{position:absolute}
    .x06-b{position:relative;padding-left:34px}
    .x06-b svg{left:13px;top:50%;margin-top:-7.5px}
    .x06-b .i2{opacity:0;transform:scale(.5) rotate(-30deg)}
    .x06-b.ok .i1{opacity:0;transform:scale(.5) rotate(30deg)}
    .x06-b.ok .i2{opacity:1;transform:none}
    .x06-b span{display:block;height:1.35em;overflow:hidden}
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
  desc:'O item some do fluxo, um vazio abre espaço e a solta encaixa com mola.',
  tags:['drag','pointer events','drop'], hint:'arraste os cards',
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
  desc:'First-Last-Invert-Play: mede antes e depois e anima a diferença.',
  tags:['FLIP','reorder','performance'], hint:'clique em embaralhar',
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
  desc:'Arraste para baixo: o indicador gira conforme a distância e solta o loading.',
  tags:['pull','pointer','mobile'], hint:'arraste para baixo',
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
    .x09-ind.spin svg{animation:x09 .8s linear infinite}
    .x09-list{padding:14px 0;will-change:transform}
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
  desc:'O item aparece imediatamente em estado "pendente" e confirma depois.',
  tags:['optimistic','pending','UX'], hint:'clique em adicionar',
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
      background:#1f1c17;border:1px solid #2a2620;font-size:12.5px;color:#dad5cb;
      animation:x10in .45s cubic-bezier(.22,1,.36,1)}
    .x10-l li b{font-weight:500;flex:1}
    .x10-l s{text-decoration:none;font-size:9.5px;font-family:var(--mono);color:#5cc88f;
      border:1px solid #5cc88f44;border-radius:5px;padding:1px 5px}
    .x10-l li.pend{opacity:.55;border-style:dashed}
    .x10-l li.pend s{color:#e8c96a;border-color:#e8c96a44}
    .x10-l li.pend b::after{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;
      background:#e8c96a;margin-left:6px;animation:x10p .9s ease-in-out infinite}
    .x10-b{width:100%;padding:9px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12px;font-weight:700}
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
}

);
