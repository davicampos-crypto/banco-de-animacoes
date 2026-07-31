/* ==========================================================
   09 · DADOS & GRÁFICOS
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'d01', cat:'dados', title:'Barras crescendo',
  desc:'Altura animada com stagger e o valor subindo junto no topo.',
  tags:['chart','stagger','transition'], hint:'passe o mouse',
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
  desc:'stroke-dashoffset em círculos SVG + contador no centro.',
  tags:['SVG','donut','dashoffset'],
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
  desc:'O path é traçado, a área entra em fade e os pontos aparecem em cascata.',
  tags:['SVG','path','area'],
  html:`<svg class="d03" viewBox="0 0 260 130" preserveAspectRatio="none"></svg>`,
  css:`
    .d03{width:250px;height:130px;overflow:visible}
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
  desc:'Encontra o ponto mais próximo do cursor e move o marcador com transição.',
  tags:['chart','tooltip','hover'], hint:'passe o mouse',
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
    .d04-cur{position:absolute;top:0;bottom:0;width:1px;background:#b08ac955;opacity:0;
      transition:transform .18s cubic-bezier(.22,1,.36,1),opacity .2s}
    .d04-cur::after{content:"";position:absolute;left:-4.5px;width:9px;height:9px;border-radius:50%;
      background:#0d0c0b;border:2.2px solid #b08ac9;top:var(--dy,0);margin-top:-4.5px;
      transition:top .18s cubic-bezier(.22,1,.36,1)}
    .d04-tip{position:absolute;top:-4px;left:0;padding:5px 9px;border-radius:8px;background:#f0ede7;color:#0e0d0c;
      font-size:11px;font-weight:700;white-space:nowrap;pointer-events:none;opacity:0;
      transition:transform .18s cubic-bezier(.22,1,.36,1),opacity .2s}
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
  desc:'Interpolação dos valores antigos para os novos — nunca corte seco.',
  tags:['morph','interpolate','rAF'], hint:'clique para trocar',
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
  desc:'As células acendem numa diagonal — leitura guiada em vez de tudo de uma vez.',
  tags:['heatmap','stagger','grid'],
  html:`<div class="d06"></div>`,
  css:`
    .d06{display:grid;grid-template-columns:repeat(14,1fr);gap:4px;width:250px}
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
}

);
