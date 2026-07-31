/* ==========================================================
   09b · DADOS & GRÁFICOS — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'dx01', cat:'dados', title:'Sparklines em tempo real',
  desc:'Série que entra pela direita e empurra a mais antiga — o gráfico "anda".',
  tags:['sparkline','streaming','SVG'], hint:'atualiza sozinho',
  html:`<div class="dx01"></div>`,
  css:`
    .dx01{width:240px;display:flex;flex-direction:column;gap:8px}
    .dx01-r{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;
      background:#191712;border:1px solid #23201a}
    .dx01-r b{font-size:11px;color:#8f8a80;font-family:var(--mono);width:38px}
    .dx01-r svg{flex:1;height:26px;overflow:visible}
    .dx01-r path{fill:none;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round}
    .dx01-r em{font-style:normal;font-size:12px;font-weight:700;width:46px;text-align:right;
      font-variant-numeric:tabular-nums;transition:color .3s}`,
  js:function(root,ctx){
    var box = root.querySelector('.dx01');
    var series = [
      { n:'CPU', cor:'#d4af37', v:[], base:45 },
      { n:'RAM', cor:'#b08ac9', v:[], base:62 },
      { n:'REDE', cor:'#5cc88f', v:[], base:28 }
    ];
    series.forEach(function(s){
      for (var i = 0; i < 26; i++) s.v.push(s.base + (Math.random()-.5) * 22);
      var r = document.createElement('div');
      r.className = 'dx01-r';
      r.innerHTML = '<b>' + s.n + '</b><svg viewBox="0 0 120 26" preserveAspectRatio="none"><path/></svg>' +
                    '<em style="color:' + s.cor + '">0%</em>';
      box.appendChild(r);
      s.path = r.querySelector('path'); s.path.setAttribute('stroke', s.cor);
      s.out = r.querySelector('em');
    });
    function pintar(){
      series.forEach(function(s){
        s.v.push(Math.max(4, Math.min(96, s.v[s.v.length-1] + (Math.random()-.5) * 18)));
        s.v.shift();
        var d = s.v.map(function(v,i){
          return (i ? 'L' : 'M') + (i * (120 / (s.v.length-1))).toFixed(1) + ' ' + (26 - v/100*24).toFixed(1);
        }).join('');
        s.path.setAttribute('d', d);
        s.out.textContent = Math.round(s.v[s.v.length-1]) + '%';
      });
    }
    pintar();
    ctx.every(pintar, 700);
  }
});

add({
  id:'dx02', cat:'dados', title:'Gauge com agulha',
  desc:'A agulha tem mola: passa do valor e volta, como um ponteiro analógico.',
  tags:['gauge','mola','SVG'], hint:'clique para sortear',
  html:`
    <div class="dx02">
      <svg viewBox="0 0 200 120">
        <path class="arc bg" d="M20 108 A80 80 0 0 1 180 108"/>
        <path class="arc fg" d="M20 108 A80 80 0 0 1 180 108"/>
        <g class="ndl"><path d="M100 108 L100 42"/><circle cx="100" cy="108" r="7"/></g>
      </svg>
      <b class="dx02-v">0</b><small>pontos de risco</small>
    </div>`,
  css:`
    .dx02{position:relative;width:210px;text-align:center}
    .dx02 svg{width:100%;height:126px}
    .dx02 .arc{fill:none;stroke-width:13;stroke-linecap:round}
    .dx02 .bg{stroke:#201e18}
    .dx02 .fg{stroke:url(#dx02g);stroke-dasharray:251;stroke-dashoffset:251;
      transition:stroke-dashoffset 1s cubic-bezier(.34,1.3,.64,1)}
    .dx02 .ndl path{stroke:#f4f1eb;stroke-width:3;stroke-linecap:round}
    .dx02 .ndl circle{fill:#f4f1eb}
    .dx02 .ndl{transform-origin:100px 108px;transform:rotate(-90deg);
      transition:transform 1.1s cubic-bezier(.34,1.5,.5,1)}
    .dx02-v{position:absolute;top:78px;left:0;right:0;font-size:26px;font-weight:800;color:#f4f1eb;
      font-variant-numeric:tabular-nums}
    .dx02 small{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#66625a}`,
  js:function(root,ctx){
    var svg = root.querySelector('svg');
    svg.insertAdjacentHTML('afterbegin',
      '<defs><linearGradient id="dx02g" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#5cc88f"/><stop offset=".55" stop-color="#e8c96a"/>' +
      '<stop offset="1" stop-color="#e5645f"/></linearGradient></defs>');
    var fg = root.querySelector('.fg'), ndl = root.querySelector('.ndl'),
        out = root.querySelector('.dx02-v'), atual = 0;
    function ir(v){
      fg.style.strokeDashoffset = 251 * (1 - v/100);
      ndl.style.transform = 'rotate(' + (-90 + v * 1.8) + 'deg)';
      var t0 = null, de = atual; atual = v;
      function f(t){
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1100);
        out.textContent = Math.round(de + (v - de) * (1 - Math.pow(1-k, 3)));
        if (k < 1) ctx.raf(f);
      }
      ctx.raf(f);
    }
    ctx.wait(function(){ ir(72); }, 200);
    ctx.on(root,'click',function(){ ir(Math.round(Math.random() * 100)); });
  }
});

add({
  id:'dx03', cat:'dados', title:'Anel com conic-gradient',
  desc:'Sem SVG: um gradiente cônico mascarado, animado por @property.',
  tags:['conic-gradient','@property','mask'],
  html:`
    <div class="dx03">
      <div class="dx03-r" style="--v:78;--c1:#d4af37;--c2:#b08ac9"><b>78%</b><span>uso</span></div>
      <div class="dx03-r sm" style="--v:34;--c1:#5cc88f;--c2:#b8871f"><b>34%</b></div>
      <div class="dx03-r sm" style="--v:92;--c1:#e8c96a;--c2:#e5645f"><b>92%</b></div>
    </div>`,
  css:`
    @property --dx03p{syntax:'<number>';initial-value:0;inherits:false}
    .dx03{display:flex;align-items:center;gap:14px}
    .dx03-r{position:relative;width:104px;height:104px;border-radius:50%;display:grid;place-content:center;
      text-align:center;--dx03p:0;
      background:conic-gradient(from -90deg,var(--c1) 0,var(--c2) calc(var(--dx03p) * 1%),#1f1c17 calc(var(--dx03p) * 1%));
      animation:dx03 1.4s cubic-bezier(.22,1,.36,1) forwards}
    .dx03-r::after{content:"";position:absolute;inset:11px;border-radius:50%;background:#111010}
    .dx03-r.sm{width:64px;height:64px}
    .dx03-r.sm::after{inset:8px}
    .dx03-r b{position:relative;z-index:2;font-size:19px;font-weight:800;color:#f4f1eb}
    .dx03-r.sm b{font-size:13px}
    .dx03-r span{position:relative;z-index:2;font-size:10px;color:#6b675f}
    @keyframes dx03{to{--dx03p:var(--v)}}`
});

add({
  id:'dx04', cat:'dados', title:'Radar chart',
  desc:'A malha aparece, o polígono cresce do centro e os vértices assentam com mola.',
  tags:['radar','polígono','SVG'], hint:'clique para trocar',
  html:`
    <div class="dx04">
      <svg viewBox="0 0 200 200"></svg>
      <div class="dx04-b"><button class="on">Candidato A</button><button>Candidato B</button></div>
    </div>`,
  css:`
    .dx04{display:flex;flex-direction:column;align-items:center;gap:8px}
    .dx04 svg{width:180px;height:180px;overflow:visible}
    .dx04 .g{fill:none;stroke:#22201a;stroke-width:1}
    .dx04 .ax{stroke:#1f1c17;stroke-width:1}
    .dx04 .area{fill:#d4af3733;stroke:#d4af37;stroke-width:2;stroke-linejoin:round;
      transition:d .7s cubic-bezier(.34,1.4,.64,1),fill .4s,stroke .4s}
    .dx04 .lb{fill:#85807a;font-size:9px;font-family:var(--mono);text-anchor:middle}
    .dx04 .pt{fill:#d4af37;transition:cx .7s cubic-bezier(.34,1.4,.64,1),cy .7s cubic-bezier(.34,1.4,.64,1),fill .4s}
    .dx04-b{display:flex;gap:5px}
    .dx04-b button{padding:5px 11px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
    .dx04-b button.on{background:#d4af3722;color:#d4af37}`,
  js:function(root,ctx){
    var svg = root.querySelector('svg'), cx = 100, cy = 100, R = 72;
    var eixos = ['Velocidade','Design','Preço','Suporte','Docs','API'];
    var dados = [[.9,.75,.45,.8,.6,.95],[.5,.95,.85,.55,.9,.45]];
    var cores = ['#d4af37','#cf9b6a'];
    var N = eixos.length;
    function ponto(i,v){
      var a = -Math.PI/2 + i / N * Math.PI * 2;
      return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
    }
    var html = '';
    [1,.75,.5,.25].forEach(function(k){
      html += '<polygon class="g" points="' + eixos.map(function(_,i){ return ponto(i,k).join(','); }).join(' ') + '"/>';
    });
    eixos.forEach(function(nome,i){
      var p = ponto(i,1), l = ponto(i,1.22);
      html += '<line class="ax" x1="'+cx+'" y1="'+cy+'" x2="'+p[0]+'" y2="'+p[1]+'"/>';
      html += '<text class="lb" x="'+l[0]+'" y="'+(l[1]+3)+'">'+nome+'</text>';
    });
    html += '<polygon class="area" points=""/>';
    eixos.forEach(function(){ html += '<circle class="pt" r="3.2" cx="'+cx+'" cy="'+cy+'"/>'; });
    svg.innerHTML = html;

    var area = svg.querySelector('.area'), pts = svg.querySelectorAll('.pt');
    function pintar(k){
      var vs = dados[k];
      area.setAttribute('points', vs.map(function(v,i){ return ponto(i,v).join(','); }).join(' '));
      area.style.fill = cores[k] + '33'; area.style.stroke = cores[k];
      pts.forEach(function(p,i){
        var q = ponto(i, vs[i]);
        p.setAttribute('cx', q[0]); p.setAttribute('cy', q[1]); p.style.fill = cores[k];
      });
    }
    ctx.wait(function(){ pintar(0); }, 120);
    root.querySelectorAll('.dx04-b button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.dx04-b button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); pintar(i);
      });
    });
  }
});

add({
  id:'dx05', cat:'dados', title:'Barras empilhadas',
  desc:'Alternar entre valor absoluto e 100% empilhado com transição — a mesma barra conta duas histórias.',
  tags:['stacked','transição','%'], hint:'clique para alternar',
  html:`
    <div class="dx05">
      <div class="dx05-ch"></div>
      <div class="dx05-lg"><span><i style="background:#d4af37"></i>Orgânico</span><span><i style="background:#b08ac9"></i>Pago</span><span><i style="background:#5cc88f"></i>Direto</span></div>
      <button class="dx05-b">ver como 100%</button>
    </div>`,
  css:`
    .dx05{width:240px}
    .dx05-ch{display:flex;align-items:flex-end;gap:10px;height:130px}
    .dx05-col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:2px;height:100%}
    .dx05-col i{display:block;border-radius:3px;transition:height .7s cubic-bezier(.22,1,.36,1)}
    .dx05-col b{font-size:9px;color:#66625a;text-align:center;margin-top:6px;font-weight:400}
    .dx05-lg{display:flex;gap:10px;margin-top:16px;font-size:10px;color:#85807a}
    .dx05-lg i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px}
    .dx05-b{width:100%;margin-top:12px;padding:8px;border-radius:9px;background:#22201a;color:#e8e5df;
      font-size:11.5px;font-weight:600}`,
  js:function(root,ctx){
    var ch = root.querySelector('.dx05-ch'),
        meses = ['Jan','Fev','Mar','Abr','Mai'],
        dados = [[40,25,15],[55,20,22],[30,45,10],[60,30,28],[48,52,20]],
        cores = ['#d4af37','#b08ac9','#5cc88f'],
        cem = false, MAX = 120;
    ch.innerHTML = meses.map(function(m,i){
      return '<div class="dx05-col">' + dados[i].map(function(_,j){
        return '<i style="background:' + cores[j] + '"></i>'; }).join('') + '<b>' + m + '</b></div>';
    }).join('');
    function pintar(){
      root.querySelectorAll('.dx05-col').forEach(function(col,i){
        var tot = dados[i].reduce(function(a,b){ return a+b; }, 0);
        col.querySelectorAll('i').forEach(function(bar,j){
          bar.style.height = (cem ? dados[i][j] / tot * 100 : dados[i][j] / MAX * 100) + '%';
        });
      });
    }
    ctx.wait(pintar, 120);
    ctx.on(root.querySelector('.dx05-b'),'click',function(){
      cem = !cem; this.textContent = cem ? 'ver valores absolutos' : 'ver como 100%'; pintar();
    });
  }
});

add({
  id:'dx06', cat:'dados', title:'Mapa com pontos pulsando',
  desc:'Cada evento gera uma onda no ponto; a intensidade define o tamanho e a cor.',
  tags:['mapa','pulso','canvas'], stage:'flush', hint:'eventos ao vivo',
  html:`<canvas class="dx06"></canvas>`,
  css:`.dx06{width:100%;height:100%;display:block;background:#0b0a08}`,
  js:function(root,ctx){
    var cv = root.querySelector('.dx06'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    // "continentes" abstratos: manchas de pontos
    var terra = [], cidades = [], ondas = [];
    for (var i = 0; i < 900; i++){
      var x = Math.random() * w, y = Math.random() * h;
      var n = Math.sin(x*.018) * Math.cos(y*.026) + Math.sin((x+y)*.01);
      if (n > .25) terra.push([x,y]);
    }
    for (var j = 0; j < 7; j++){
      var t = terra[(Math.random() * terra.length) | 0];
      if (t) cidades.push({ x:t[0], y:t[1], n:['SP','NY','LDN','TÓQ','BER','SYD','DXB'][j] });
    }
    ctx.every(function(){
      var ci = cidades[(Math.random() * cidades.length) | 0];
      if (ci) ondas.push({ x:ci.x, y:ci.y, r:0, a:1, forte:Math.random() < .35 });
    }, 620);
    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      c.fillStyle = 'rgba(120,104,66,.5)';
      terra.forEach(function(p){ c.fillRect(p[0], p[1], 1.6, 1.6); });
      ondas.forEach(function(o){
        o.r += o.forte ? 1.5 : .9; o.a *= .975;
        c.strokeStyle = (o.forte ? 'rgba(229,100,95,' : 'rgba(212,175,55,') + o.a + ')';
        c.lineWidth = 1.4;
        c.beginPath(); c.arc(o.x,o.y,o.r,0,6.284); c.stroke();
      });
      ondas = ondas.filter(function(o){ return o.a > .05; });
      cidades.forEach(function(ci){
        c.fillStyle = '#d4af37';
        c.beginPath(); c.arc(ci.x, ci.y, 2.6, 0, 6.284); c.fill();
        c.fillStyle = 'rgba(214,200,164,.75)';
        c.font = '8px "JetBrains Mono",monospace';
        c.fillText(ci.n, ci.x + 6, ci.y + 3);
      });
    });
  }
});

add({
  id:'dx07', cat:'dados', title:'Treemap com re-layout',
  desc:'Ao trocar o período, cada retângulo anima posição e tamanho até o novo layout.',
  tags:['treemap','layout','transição'], hint:'clique para trocar',
  html:`
    <div class="dx07">
      <div class="dx07-m"></div>
      <div class="dx07-b"><button class="on">2024</button><button>2025</button></div>
    </div>`,
  css:`
    .dx07{width:250px}
    .dx07-m{position:relative;width:100%;height:140px}
    .dx07-c{position:absolute;border-radius:7px;padding:7px 8px;overflow:hidden;
      transition:all .75s cubic-bezier(.22,1,.36,1)}
    .dx07-c b{display:block;font-size:10.5px;color:#ffffffdd;font-weight:600;white-space:nowrap}
    .dx07-c s{text-decoration:none;font-size:9px;color:#ffffff88;font-family:var(--mono)}
    .dx07-b{display:flex;gap:5px;margin-top:12px}
    .dx07-b button{flex:1;padding:6px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
    .dx07-b button.on{background:#d4af3722;color:#d4af37}`,
  js:function(root,ctx){
    var box = root.querySelector('.dx07-m'), W = 250, H = 140;
    var sets = [
      [['Busca',42],['Social',26],['Email',14],['Ads',11],['Outros',7]],
      [['Social',38],['Busca',22],['Ads',19],['Outros',12],['Email',9]]
    ];
    var cores = { 'Busca':'#8a6a17','Social':'#5c3f70','Email':'#047857','Ads':'#8a5a1c','Outros':'#454037' };
    var els = {};
    // squarify simplificado: corta o eixo maior a cada item
    function layout(dados){
      var x = 0, y = 0, w = W, h = H, tot = dados.reduce(function(a,b){ return a + b[1]; }, 0);
      return dados.map(function(d,i){
        var frac = d[1] / tot, r;
        if (i === dados.length - 1) r = [x,y,w,h];
        else if (w >= h){ var cw = w * frac / (1); r = [x,y,cw,h]; x += cw; w -= cw; }
        else { var chh = h * frac / (1); r = [x,y,w,chh]; y += chh; h -= chh; }
        tot -= d[1];
        return { nome:d[0], v:d[1], r:r };
      });
    }
    function pintar(k){
      layout(sets[k]).forEach(function(it){
        var el = els[it.nome];
        if (!el){
          el = document.createElement('div');
          el.className = 'dx07-c';
          el.style.background = cores[it.nome];
          box.appendChild(el);
          els[it.nome] = el;
        }
        el.innerHTML = '<b>' + it.nome + '</b><s>' + it.v + '%</s>';
        el.style.left = it.r[0] + 'px'; el.style.top = it.r[1] + 'px';
        el.style.width = (it.r[2] - 3) + 'px'; el.style.height = (it.r[3] - 3) + 'px';
      });
    }
    pintar(0);
    root.querySelectorAll('.dx07-b button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.dx07-b button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); pintar(i);
      });
    });
  }
});

add({
  id:'dx08', cat:'dados', title:'Diagrama de Sankey',
  desc:'As fitas são curvas de Bézier desenhadas progressivamente; o hover isola um fluxo.',
  tags:['sankey','bézier','fluxo'], hint:'passe o mouse nas fitas',
  html:`<svg class="dx08" viewBox="0 0 250 150"></svg>`,
  css:`
    .dx08{width:250px;height:150px;overflow:visible}
    .dx08 .fita{fill:none;stroke-linecap:butt;opacity:.55;
      transition:opacity .3s,stroke-width .3s;
      stroke-dasharray:var(--l);stroke-dashoffset:var(--l);
      animation:dx08 1.3s cubic-bezier(.65,0,.35,1) forwards}
    .dx08:hover .fita{opacity:.16}
    .dx08 .fita:hover{opacity:.95}
    .dx08 .no{fill:#2d2921}
    .dx08 text{fill:#a5a099;font-size:8px;font-family:var(--mono)}
    @keyframes dx08{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var svg = root.querySelector('.dx08');
    var esq = [['Orgânico',52,'#d4af37'],['Pago',30,'#b08ac9'],['Direto',18,'#5cc88f']];
    var dir = [['Compra',34],['Cadastro',28],['Saída',38]];
    var fluxos = [[0,0,26],[0,1,14],[0,2,12],[1,0,6],[1,1,10],[1,2,14],[2,0,2],[2,1,4],[2,2,12]];
    var H = 130, top = 10, html = '', ye = [], yd = [];
    var ae = top, ad = top;
    esq.forEach(function(e){ ye.push(ae); ae += e[1]/100 * H; });
    dir.forEach(function(d){ yd.push(ad); ad += d[1]/100 * H; });
    var oe = ye.slice(), od = yd.slice();

    fluxos.forEach(function(f){
      var g = f[2]/100 * H;
      var y1 = oe[f[0]] + g/2, y2 = od[f[1]] + g/2;
      oe[f[0]] += g; od[f[1]] += g;
      html += '<path class="fita" stroke="' + esq[f[0]][2] + '" stroke-width="' + g + '"' +
              ' d="M32 ' + y1.toFixed(1) + ' C110 ' + y1.toFixed(1) + ', 140 ' + y2.toFixed(1) +
              ', 218 ' + y2.toFixed(1) + '"/>';
    });
    esq.forEach(function(e,i){
      html += '<rect class="no" x="26" y="' + ye[i] + '" width="6" height="' + (e[1]/100*H) + '" rx="2" fill="' + e[2] + '"/>';
      html += '<text x="22" y="' + (ye[i] + e[1]/100*H/2 + 3) + '" text-anchor="end">' + e[0] + '</text>';
    });
    dir.forEach(function(d,i){
      html += '<rect class="no" x="218" y="' + yd[i] + '" width="6" height="' + (d[1]/100*H) + '" rx="2"/>';
      html += '<text x="228" y="' + (yd[i] + d[1]/100*H/2 + 3) + '">' + d[0] + '</text>';
    });
    svg.innerHTML = html;
    svg.querySelectorAll('.fita').forEach(function(p,i){
      p.style.setProperty('--l', p.getTotalLength());
      p.style.animationDelay = (i * 70) + 'ms';
    });
  }
});

add({
  id:'dx09', cat:'dados', title:'Candlestick com zoom',
  desc:'Cada vela entra crescendo do preço de abertura; a roda do mouse ajusta a janela.',
  tags:['candlestick','zoom','canvas'], stage:'flush', hint:'role a roda sobre o gráfico',
  html:`<canvas class="dx09"></canvas>`,
  css:`.dx09{width:100%;height:100%;display:block;background:#0a0c12;cursor:ew-resize}`,
  js:function(root,ctx){
    var cv = root.querySelector('.dx09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var velas = [], p = 100;
    for (var i = 0; i < 90; i++){
      var o = p, cl = o + (Math.random()-.49) * 6;
      velas.push({ o:o, c:cl, hi:Math.max(o,cl) + Math.random()*3, lo:Math.min(o,cl) - Math.random()*3 });
      p = cl;
    }
    var janela = 34, alvo = 34, t0 = performance.now();
    ctx.on(cv,'wheel',function(e){
      e.preventDefault();
      alvo = Math.max(12, Math.min(90, alvo + (e.deltaY > 0 ? 6 : -6)));
    }, { passive:false });

    ctx.loop(function(){
      janela += (alvo - janela) * .12;
      var n = Math.round(janela), vis = velas.slice(-n);
      var hi = Math.max.apply(null, vis.map(function(v){ return v.hi; }));
      var lo = Math.min.apply(null, vis.map(function(v){ return v.lo; }));
      var esc = function(v){ return h - 12 - (v - lo) / (hi - lo) * (h - 28); };
      var bw = w / n, entrada = Math.min(1, (performance.now() - t0) / 900);

      c.clearRect(0,0,w,h);
      c.strokeStyle = '#15151f';
      for (var g = 0; g < 4; g++){ var y = 12 + g*(h-24)/3; c.beginPath(); c.moveTo(0,y); c.lineTo(w,y); c.stroke(); }
      vis.forEach(function(v,i){
        var alta = v.c >= v.o, cor = alta ? '#5cc88f' : '#e5645f';
        var x = i * bw + bw/2;
        var k = Math.max(0, Math.min(1, entrada * n - i * .4));   // entra em cascata
        var yo = esc(v.o), yc = esc(v.o + (v.c - v.o) * k);
        c.strokeStyle = cor; c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x, esc(v.o + (v.hi - v.o) * k)); c.lineTo(x, esc(v.o + (v.lo - v.o) * k));
        c.stroke();
        c.fillStyle = cor;
        c.fillRect(x - bw*.32, Math.min(yo,yc), Math.max(1.5, bw*.64), Math.max(1, Math.abs(yc-yo)));
      });
      c.fillStyle = '#66625a'; c.font = '9px "JetBrains Mono",monospace';
      c.fillText(n + ' velas · roda para ajustar', 8, 12);
    });
  }
});

add({
  id:'dx10', cat:'dados', title:'Waffle chart',
  desc:'Cem quadradinhos: cada um é 1%. Preenche em ondas e é mais legível que uma pizza.',
  tags:['waffle','proporção','stagger'], hint:'clique para trocar',
  html:`
    <div class="dx10">
      <div class="dx10-g"></div>
      <div class="dx10-lg"></div>
    </div>`,
  css:`
    .dx10{width:220px}
    .dx10-g{display:grid;grid-template-columns:repeat(10,1fr);gap:3px}
    .dx10-g i{aspect-ratio:1;border-radius:2.5px;background:#201d18;
      transition:background .35s cubic-bezier(.22,1,.36,1),transform .35s cubic-bezier(.34,1.56,.64,1)}
    .dx10-lg{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;font-size:10px;color:#8f8a80;cursor:pointer}
    .dx10-lg i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px}`,
  js:function(root,ctx){
    var g = root.querySelector('.dx10-g'), lg = root.querySelector('.dx10-lg');
    g.innerHTML = Array(100).join('.').split('.').map(function(){ return '<i></i>'; }).join('');
    var cells = g.querySelectorAll('i');
    var sets = [
      [['Mobile',58,'#d4af37'],['Desktop',31,'#b08ac9'],['Tablet',11,'#5cc88f']],
      [['Mobile',44,'#d4af37'],['Desktop',46,'#b08ac9'],['Tablet',10,'#5cc88f']]
    ];
    var k = 0;
    function pintar(){
      var s = sets[k], i = 0;
      s.forEach(function(part){
        for (var j = 0; j < part[1]; j++, i++){
          (function(el,cor,ord){
            ctx.wait(function(){
              el.style.background = cor;
              el.style.transform = 'scale(1.14)';
              ctx.wait(function(){ el.style.transform = ''; }, 160);
            }, ord * 9);
          })(cells[i], part[2], i);
        }
      });
      lg.innerHTML = s.map(function(p){
        return '<span><i style="background:' + p[2] + '"></i>' + p[0] + ' ' + p[1] + '%</span>'; }).join('');
    }
    pintar();
    ctx.on(lg,'click',function(){ k = (k + 1) % sets.length; pintar(); });
  }
});

add({
  id:'dx11', cat:'dados', title:'Brush de série temporal',
  desc:'Arraste na faixa de baixo para recortar o período; o gráfico de cima segue com transição.',
  tags:['brush','zoom','SVG'], hint:'arraste na faixa inferior',
  html:`
    <div class="dx11">
      <svg class="dx11-main" viewBox="0 0 250 90" preserveAspectRatio="none"><path class="ln"/><path class="ar"/></svg>
      <div class="dx11-mini">
        <svg viewBox="0 0 250 34" preserveAspectRatio="none"><path class="mn"/></svg>
        <div class="dx11-sel"></div>
      </div>
      <small class="dx11-lbl"></small>
    </div>`,
  css:`
    .dx11{width:250px}
    .dx11-main{width:100%;height:90px;overflow:visible}
    .dx11 .ln{fill:none;stroke:#d4af37;stroke-width:2;stroke-linejoin:round;
      transition:d .45s cubic-bezier(.22,1,.36,1)}
    .dx11 .ar{fill:#d4af371c;transition:d .45s cubic-bezier(.22,1,.36,1)}
    .dx11-mini{position:relative;margin-top:8px;height:34px;background:#141312;border-radius:7px;
      overflow:hidden;cursor:ew-resize;touch-action:none}
    .dx11-mini svg{width:100%;height:34px}
    .dx11 .mn{fill:none;stroke:#3d3729;stroke-width:1.4}
    .dx11-sel{position:absolute;top:0;bottom:0;background:#d4af371e;border-left:2px solid #d4af37;
      border-right:2px solid #d4af37;pointer-events:none}
    .dx11-lbl{display:block;margin-top:7px;font-family:var(--mono);font-size:10px;color:#66625a}`,
  js:function(root,ctx){
    var N = 120, dados = [], v = 50;
    for (var i = 0; i < N; i++){ v += (Math.random()-.48) * 7; dados.push(Math.max(6, Math.min(94, v))); }
    var ln = root.querySelector('.ln'), ar = root.querySelector('.ar'),
        mn = root.querySelector('.mn'), sel = root.querySelector('.dx11-sel'),
        mini = root.querySelector('.dx11-mini'), lbl = root.querySelector('.dx11-lbl');

    function caminho(vals,W,H,pad){
      return vals.map(function(v,i){
        return (i ? 'L' : 'M') + (i * (W / (vals.length-1))).toFixed(1) + ' ' +
               (H - v/100 * (H - pad)).toFixed(1);
      }).join('');
    }
    mn.setAttribute('d', caminho(dados, 250, 34, 6));

    var a = .25, b = .7;
    function pintar(){
      var i0 = Math.floor(a * N), i1 = Math.max(i0 + 2, Math.floor(b * N));
      var corte = dados.slice(i0, i1);
      var d = caminho(corte, 250, 90, 12);
      ln.setAttribute('d', d);
      ar.setAttribute('d', d + ' L250 90 L0 90Z');
      sel.style.left = (a * 100) + '%';
      sel.style.width = ((b - a) * 100) + '%';
      lbl.textContent = 'dia ' + (i0 + 1) + ' → ' + i1 + '  (' + (i1 - i0) + ' pontos)';
    }
    pintar();

    var down = false, ini = 0;
    ctx.on(mini,'pointerdown',function(e){
      down = true;
      var r = mini.getBoundingClientRect();
      ini = (e.clientX - r.left) / r.width;
      mini.setPointerCapture(e.pointerId);
    });
    ctx.on(mini,'pointermove',function(e){
      if (!down) return;
      var r = mini.getBoundingClientRect();
      var x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      a = Math.min(ini, x); b = Math.max(ini, x);
      if (b - a < .06) b = Math.min(1, a + .06);
      pintar();
    });
    ctx.on(mini,'pointerup',function(){ down = false; });
  }
});

})();
