/* ==========================================================
   EFEITOS AVANÇADOS · A — 3D integrado a imagens
   WebGL cru / canvas, texturas procedurais, zero libs
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'fx01', cat:'depth', title:'Parallax por depth map (fake 3D)',
  desc:'O fragment shader lê um depth map (luminância = profundidade) e desloca as UVs da foto na direção do mouse, proporcionalmente ao depth de cada pixel — o primeiro plano anda mais que o fundo e a foto plana ganha volume.',
  tags:['depth map','UV displacement','GLSL','fragment shader','texture2D'],
  stage:'flush', hint:'mova o mouse',
  html:`
    <div class="fx01">
      <canvas class="fx01-cv"></canvas>
      <div class="fx01-fb" hidden>WebGL indisponível — imagem estática</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/" target="_blank" rel="noopener">Codrops — Fake 3D com depth map</a><a href="https://tympanus.net/codrops/tag/distortion/" target="_blank" rel="noopener">Tag distortion no Codrops</a><a href="referencias/fake3d-depth-map.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
    </div>`,
  css:`
    .fx01{position:relative;width:100%;height:100%;background:#0a0908}
    .fx01-cv{width:100%;height:100%;display:block;cursor:crosshair}
    .fx01-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(#2a2440,#6f4f86 55%,#241f14)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx01-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx01-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);

    // ---- "foto" + depth map procedurais (paisagem em gradientes) ----
    function paisagem(profundidade){
      var c = document.createElement('canvas'); c.width = 512; c.height = 320;
      var g = c.getContext('2d');
      if (!profundidade){
        var ceu = g.createLinearGradient(0,0,0,320);
        ceu.addColorStop(0,'#1b1633'); ceu.addColorStop(.6,'#6f4f86'); ceu.addColorStop(1,'#d4af37');
        g.fillStyle = ceu; g.fillRect(0,0,512,320);
        g.fillStyle = '#e8c96a'; g.beginPath(); g.arc(340,150,44,0,6.284); g.fill();
      } else {
        g.fillStyle = '#000'; g.fillRect(0,0,512,320);       // céu = longe
      }
      // três cordilheiras: quanto mais perto, mais clara no depth
      var tons = profundidade ? ['#404040','#909090','#e0e0e0'] : ['#3a2f52','#241f36','#12101c'];
      [175,215,262].forEach(function(base,i){
        g.fillStyle = tons[i];
        g.beginPath(); g.moveTo(0,320);
        for (var x = 0; x <= 512; x += 16)
          g.lineTo(x, base - Math.abs(Math.sin(x*.02 + i*7))*(46 - i*10) - Math.sin(x*.11+i)*8);
        g.lineTo(512,320); g.closePath(); g.fill();
      });
      return c;
    }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    function textura(cnv,unidade){
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      return t;
    }

    var prog = compilar(
      'attribute vec2 aP; varying vec2 vUV;' +
      'void main(){ vUV = aP*.5+.5; gl_Position = vec4(aP,0.,1.); }',
      'precision mediump float; varying vec2 vUV;' +
      'uniform sampler2D uCor, uProf; uniform vec2 uMouse;' +
      'void main(){' +
      '  float d = texture2D(uProf, vUV).r;' +               // 0 = longe, 1 = perto
      '  vec2 uv = vUV + (d - .5) * uMouse * .06;' +         // desloca UV pelo depth
      '  gl_FragColor = texture2D(uCor, uv);' +
      '}');
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    textura(paisagem(false), 0);
    textura(paisagem(true), 1);
    gl.uniform1i(gl.getUniformLocation(prog,'uCor'), 0);
    gl.uniform1i(gl.getUniformLocation(prog,'uProf'), 1);
    var uMouse = gl.getUniformLocation(prog,'uMouse');

    var mx = 0, my = 0, x = 0, y = 0;
    ctx.on(cv,'pointermove',function(e){
      var r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width * 2 - 1;
      my = -((e.clientY - r.top) / r.height * 2 - 1);
    });
    ctx.on(cv,'pointerleave',function(){ mx = 0; my = 0; });

    ctx.loop(function(){
      x += (mx - x) * .08; y += (my - y) * .08;              // suaviza o mouse
      gl.uniform2f(uMouse, x, y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx02', cat:'depth', title:'Displacement de vértices (foto vira relevo)',
  desc:'Uma grade de 64×48 vértices recebe a foto como textura; a profundidade é lida do depth map na CPU e vira o Z de cada vértice, que o vertex shader rotaciona com perspectiva — relevo geométrico real, não só distorção de UV.',
  tags:['vertex displacement','depth texture','mesh grid','perspectiva'],
  stage:'flush', hint:'mova o mouse',
  html:`
    <div class="fx02">
      <canvas class="fx02-cv"></canvas>
      <div class="fx02-fb" hidden>WebGL indisponível</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://discourse.threejs.org/" target="_blank" rel="noopener">three.js forum — 3D from image parallax</a><a href="https://tympanus.net/codrops/tag/3d/" target="_blank" rel="noopener">Codrops tag 3D</a></div>
    </div>`,
  css:`
    .fx02{position:relative;width:100%;height:100%;background:#0a0908}
    .fx02-cv{width:100%;height:100%;display:block;cursor:crosshair}
    .fx02-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(#241f14,#3a2f52)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx02-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx02-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);
    gl.enable(gl.DEPTH_TEST);

    // paisagem + depth desenhados juntos (mesma geometria, cores ≠)
    var COLS = 64, ROWS = 48;
    var cor = document.createElement('canvas'); cor.width = 256; cor.height = 192;
    var prof = document.createElement('canvas'); prof.width = COLS+1; prof.height = ROWS+1;
    [ [cor.getContext('2d'), false], [prof.getContext('2d'), true] ].forEach(function(par){
      var g = par[0], eDepth = par[1], W = g.canvas.width, H = g.canvas.height;
      if (eDepth){ g.fillStyle = '#000'; }
      else {
        var ceu = g.createLinearGradient(0,0,0,H);
        ceu.addColorStop(0,'#191430'); ceu.addColorStop(.65,'#b08ac9'); ceu.addColorStop(1,'#d4af37');
        g.fillStyle = ceu;
      }
      g.fillRect(0,0,W,H);
      var tons = eDepth ? ['#3c3c3c','#8c8c8c','#dcdcdc'] : ['#41345c','#28223c','#151222'];
      [ .52, .66, .82 ].forEach(function(fy,i){
        g.fillStyle = tons[i];
        g.beginPath(); g.moveTo(0,H);
        for (var x = 0; x <= W; x++)
          g.lineTo(x, H*fy - Math.abs(Math.sin(x/W*10 + i*7))*H*(.17 - i*.04) - Math.sin(x/W*31+i)*H*.03);
        g.lineTo(W,H); g.closePath(); g.fill();
      });
    });

    // profundidade lida na CPU → atributo Z de cada vértice
    var pd = prof.getContext('2d').getImageData(0,0,COLS+1,ROWS+1).data;
    var verts = [], idx = [];
    for (var r = 0; r <= ROWS; r++)
      for (var c2 = 0; c2 <= COLS; c2++){
        var z = pd[(r*(COLS+1)+c2)*4] / 255;                 // luminância = altura
        verts.push(c2/COLS, 1 - r/ROWS, z);
      }
    for (var r2 = 0; r2 < ROWS; r2++)
      for (var c3 = 0; c3 < COLS; c3++){
        var a = r2*(COLS+1)+c3, b = a+1, d = a+COLS+1, e = d+1;
        idx.push(a,b,d, b,e,d);
      }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    var prog = compilar(
      'attribute vec3 aP; varying vec2 vUV; varying float vZ; uniform vec2 uRot;' +
      'void main(){' +
      '  vUV = aP.xy; vZ = aP.z;' +
      '  vec3 p = vec3(aP.x*2.-1., aP.y*1.4-.7, aP.z*.45);' +
      '  float cy = cos(uRot.x), sy = sin(uRot.x);' +        // gira em Y (mouse x)
      '  p = vec3(p.x*cy + p.z*sy, p.y, -p.x*sy + p.z*cy);' +
      '  float cx = cos(uRot.y), sx = sin(uRot.y);' +        // gira em X (mouse y)
      '  p = vec3(p.x, p.y*cx - p.z*sx, p.y*sx + p.z*cx);' +
      '  gl_Position = vec4(p.xy, -p.z, 1.35 - p.z);' +      // perspectiva: w cresce ao afastar
      '}',
      'precision mediump float; varying vec2 vUV; varying float vZ; uniform sampler2D uCor;' +
      'void main(){' +
      '  vec3 c = texture2D(uCor, vUV).rgb;' +
      '  gl_FragColor = vec4(c * (.72 + vZ*.5), 1.);' +      // perto = mais iluminado
      '}');
    gl.useProgram(prog);

    var vb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
    var ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);

    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cor);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    var uRot = gl.getUniformLocation(prog,'uRot');

    var mx = 0, my = 0, rx = 0, ry = 0, t = 0;
    ctx.on(cv,'pointermove',function(e){
      var r3 = cv.getBoundingClientRect();
      mx = ((e.clientX - r3.left) / r3.width - .5) * .8;
      my = ((e.clientY - r3.top) / r3.height - .5) * .6;
    });
    ctx.on(cv,'pointerleave',function(){ mx = 0; my = 0; });

    ctx.loop(function(){
      t += .008;
      rx += (mx + Math.sin(t)*.12 - rx) * .06;               // deriva contínua + mouse
      ry += (my + .28 - ry) * .06;
      gl.clearColor(.04,.035,.03,1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform2f(uRot, rx, ry);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx03', cat:'depth', title:'Scanning reveal por profundidade',
  desc:'O shader compara o depth de cada pixel com um plano de varredura que oscila no tempo: pixels na faixa acendem em dourado emissivo (feixe LIDAR), os já varridos aparecem, os demais ficam na penumbra — um depth slice animado.',
  tags:['depth slice','scanline','WebGPU-style','emissive'],
  stage:'flush',
  html:`
    <div class="fx03">
      <canvas class="fx03-cv"></canvas>
      <div class="fx03-fb" hidden>WebGL indisponível</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/?s=scanning" target="_blank" rel="noopener">Codrops — WebGPU Scanning Effect</a><a href="https://tympanus.net/codrops/category/tutorials/" target="_blank" rel="noopener">Codrops WebGL</a></div>
    </div>`,
  css:`
    .fx03{position:relative;width:100%;height:100%;background:#080706}
    .fx03-cv{width:100%;height:100%;display:block}
    .fx03-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(#12101c,#241f14)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx03-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx03-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);

    function paisagem(profundidade){
      var c = document.createElement('canvas'); c.width = 512; c.height = 320;
      var g = c.getContext('2d');
      if (!profundidade){
        var ceu = g.createLinearGradient(0,0,0,320);
        ceu.addColorStop(0,'#0e0c1c'); ceu.addColorStop(.7,'#3a2f52'); ceu.addColorStop(1,'#6f4f86');
        g.fillStyle = ceu; g.fillRect(0,0,512,320);
        g.fillStyle = '#b08ac9'; g.beginPath(); g.arc(150,110,34,0,6.284); g.fill();
      } else { g.fillStyle = '#000'; g.fillRect(0,0,512,320); }
      var tons = profundidade ? ['#484848','#989898','#e6e6e6'] : ['#2e2648','#1d1930','#100e1a'];
      [180,220,268].forEach(function(base,i){
        g.fillStyle = tons[i];
        g.beginPath(); g.moveTo(0,320);
        for (var x = 0; x <= 512; x += 14)
          g.lineTo(x, base - Math.abs(Math.sin(x*.017 + i*5))*(50 - i*11) - Math.sin(x*.09+i*2)*7);
        g.lineTo(512,320); g.closePath(); g.fill();
      });
      return c;
    }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    function textura(cnv,unidade){
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    var prog = compilar(
      'attribute vec2 aP; varying vec2 vUV;' +
      'void main(){ vUV = aP*.5+.5; gl_Position = vec4(aP,0.,1.); }',
      'precision mediump float; varying vec2 vUV;' +
      'uniform sampler2D uCor, uProf; uniform float uT;' +
      'void main(){' +
      '  vec3 c = texture2D(uCor, vUV).rgb;' +
      '  float d = texture2D(uProf, vUV).r;' +
      '  float plano = .5 + .5*sin(uT*.9);' +                // plano de varredura vai e volta
      '  float feixe = 1. - smoothstep(0., .045, abs(d - plano));' +  // faixa fina de depth
      '  float varrido = smoothstep(0., .25, plano - d);' +  // atrás do plano: revelado
      '  vec3 base = c * (.15 + .85*varrido);' +
      '  vec3 ouro = vec3(.83,.69,.22);' +
      '  float grade = feixe * (.6 + .4*sin(vUV.y*240.));' + // scanlines dentro do feixe
      '  gl_FragColor = vec4(base + ouro*grade*1.6, 1.);' +
      '}');
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    textura(paisagem(false), 0);
    textura(paisagem(true), 1);
    gl.uniform1i(gl.getUniformLocation(prog,'uCor'), 0);
    gl.uniform1i(gl.getUniformLocation(prog,'uProf'), 1);
    var uT = gl.getUniformLocation(prog,'uT');

    var t0 = performance.now();
    ctx.loop(function(){
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx07', cat:'hoverfx', title:'Distortion hover (transição por displacement)',
  desc:'Duas texturas e um displacement map de ruído: o shader desloca as UVs de cada imagem pelo valor do ruído, com intensidade proporcional ao progresso, e faz mix entre elas — as fotos se rasgam uma na outra em vez de um crossfade chapado.',
  tags:['displacement map','mix','noise','transição'],
  stage:'flush', hint:'passe o mouse',
  html:`
    <div class="fx07">
      <canvas class="fx07-cv"></canvas>
      <div class="fx07-fb" hidden>WebGL indisponível</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/" target="_blank" rel="noopener">Codrops — Distortion Hover Effects</a><a href="referencias/distortion-hover.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
    </div>`,
  css:`
    .fx07{position:relative;width:100%;height:100%;background:#0a0908}
    .fx07-cv{width:100%;height:100%;display:block;cursor:pointer}
    .fx07-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(120deg,#241f14,#362540)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx07-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx07-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);

    // duas "fotos" procedurais com clima distinto
    function cena(quente){
      var c = document.createElement('canvas'); c.width = 512; c.height = 320;
      var g = c.getContext('2d');
      var grd = g.createLinearGradient(0,0,0,320);
      if (quente){ grd.addColorStop(0,'#3a2410'); grd.addColorStop(.6,'#b8871f'); grd.addColorStop(1,'#e8c96a'); }
      else       { grd.addColorStop(0,'#0e0c1c'); grd.addColorStop(.6,'#3a2f52'); grd.addColorStop(1,'#b08ac9'); }
      g.fillStyle = grd; g.fillRect(0,0,512,320);
      g.fillStyle = quente ? '#e8c96a' : '#d7d7e2';
      g.beginPath(); g.arc(quente ? 360 : 140, 120, 40, 0, 6.284); g.fill();
      g.fillStyle = quente ? '#241608' : '#0c0a16';
      g.beginPath(); g.moveTo(0,320);
      for (var x = 0; x <= 512; x += 12)
        g.lineTo(x, 240 - Math.abs(Math.sin(x*.02 + (quente?0:3)))*60);
      g.lineTo(512,320); g.closePath(); g.fill();
      return c;
    }
    // displacement map: ruído suave (32px aleatório esticado = borrado)
    function ruido(){
      var mini = document.createElement('canvas'); mini.width = 32; mini.height = 32;
      var mg = mini.getContext('2d'), im = mg.createImageData(32,32);
      for (var i = 0; i < im.data.length; i += 4){
        var v = Math.random()*255|0;
        im.data[i] = im.data[i+1] = im.data[i+2] = v; im.data[i+3] = 255;
      }
      mg.putImageData(im,0,0);
      var c = document.createElement('canvas'); c.width = 256; c.height = 256;
      var g = c.getContext('2d');
      g.imageSmoothingEnabled = true;
      g.drawImage(mini, 0, 0, 256, 256);
      return c;
    }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    function textura(cnv,unidade){
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    var prog = compilar(
      'attribute vec2 aP; varying vec2 vUV;' +
      'void main(){ vUV = aP*.5+.5; gl_Position = vec4(aP,0.,1.); }',
      'precision mediump float; varying vec2 vUV;' +
      'uniform sampler2D uA, uB, uDisp; uniform float uP;' +
      'void main(){' +
      '  float d = texture2D(uDisp, vUV).r;' +
      '  vec2 uvA = vUV + vec2(d * uP * .35, 0.);' +         // A rasga saindo
      '  vec2 uvB = vUV - vec2(d * (1. - uP) * .35, 0.);' +  // B rasga entrando
      '  gl_FragColor = mix(texture2D(uA, uvA), texture2D(uB, uvB), uP);' +
      '}');
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    textura(cena(true), 0);
    textura(cena(false), 1);
    textura(ruido(), 2);
    gl.uniform1i(gl.getUniformLocation(prog,'uA'), 0);
    gl.uniform1i(gl.getUniformLocation(prog,'uB'), 1);
    gl.uniform1i(gl.getUniformLocation(prog,'uDisp'), 2);
    var uP = gl.getUniformLocation(prog,'uP');

    var alvo = 0, p = 0;
    ctx.on(cv,'pointerenter',function(){ alvo = 1; });
    ctx.on(cv,'pointerleave',function(){ alvo = 0; });

    ctx.loop(function(){
      p += (alvo - p) * .07;
      gl.uniform1f(uP, p);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx08', cat:'hoverfx', title:'Gooey / liquid reveal',
  desc:'A máscara de transição é um fbm (4 oitavas de value noise) animado no tempo; smoothstep sobre (fbm − progresso) cria uma borda orgânica que derrete uma imagem sobre a outra, com um filete dourado na fronteira líquida.',
  tags:['simplex noise','fbm','smoothstep','liquid'],
  stage:'flush', hint:'passe o mouse',
  html:`
    <div class="fx08">
      <canvas class="fx08-cv"></canvas>
      <div class="fx08-fb" hidden>WebGL indisponível</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/" target="_blank" rel="noopener">Codrops — Gooey Image Hover</a><a href="referencias/gooey-hover.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
    </div>`,
  css:`
    .fx08{position:relative;width:100%;height:100%;background:#0a0908}
    .fx08-cv{width:100%;height:100%;display:block;cursor:pointer}
    .fx08-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(160deg,#1e352a,#241f14)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx08-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx08-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);

    function cena(noturna){
      var c = document.createElement('canvas'); c.width = 512; c.height = 320;
      var g = c.getContext('2d');
      var grd = g.createLinearGradient(0,0,0,320);
      if (noturna){ grd.addColorStop(0,'#0a1410'); grd.addColorStop(.7,'#1e352a'); grd.addColorStop(1,'#5cc88f'); }
      else        { grd.addColorStop(0,'#2a1a08'); grd.addColorStop(.7,'#b8871f'); grd.addColorStop(1,'#e8c96a'); }
      g.fillStyle = grd; g.fillRect(0,0,512,320);
      g.fillStyle = noturna ? '#d7d7e2' : '#fff3cf';
      g.beginPath(); g.arc(noturna ? 380 : 130, 100, 36, 0, 6.284); g.fill();
      g.fillStyle = noturna ? '#050a08' : '#1c1206';
      g.beginPath(); g.moveTo(0,320);
      for (var x = 0; x <= 512; x += 10)
        g.lineTo(x, 250 - Math.abs(Math.sin(x*.016 + (noturna?4:0)))*55);
      g.lineTo(512,320); g.closePath(); g.fill();
      return c;
    }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    function textura(cnv,unidade){
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    var prog = compilar(
      'attribute vec2 aP; varying vec2 vUV;' +
      'void main(){ vUV = aP*.5+.5; gl_Position = vec4(aP,0.,1.); }',
      'precision mediump float; varying vec2 vUV;' +
      'uniform sampler2D uA, uB; uniform float uP, uT;' +
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }' +
      'float noise(vec2 p){' +
      '  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);' +
      '  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),' +
      '             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);' +
      '}' +
      'float fbm(vec2 p){' +                                 // 4 oitavas
      '  float v = 0., a = .5;' +
      '  for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.1; a *= .5; }' +
      '  return v;' +
      '}' +
      'void main(){' +
      '  float n = fbm(vUV * 3.5 + vec2(uT*.15, uT*.1));' +
      '  float corte = uP * 1.3 - .15;' +
      '  float m = smoothstep(corte - .07, corte + .07, n);' +   // 1 = ainda mostra A
      '  float borda = smoothstep(.0, .09, abs(n - corte));' +
      '  vec4 c = mix(texture2D(uB, vUV), texture2D(uA, vUV), m);' +
      '  gl_FragColor = c + vec4(.83,.69,.22,0.) * (1. - borda) * .5;' + // filete dourado
      '}');
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    textura(cena(false), 0);
    textura(cena(true), 1);
    gl.uniform1i(gl.getUniformLocation(prog,'uA'), 0);
    gl.uniform1i(gl.getUniformLocation(prog,'uB'), 1);
    var uP = gl.getUniformLocation(prog,'uP');
    var uT = gl.getUniformLocation(prog,'uT');

    var alvo = 0, p = 0, t0 = performance.now();
    ctx.on(cv,'pointerenter',function(){ alvo = 1; });
    ctx.on(cv,'pointerleave',function(){ alvo = 0; });

    ctx.loop(function(){
      p += (alvo - p) * .05;
      gl.uniform1f(uP, p);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx09', cat:'hoverfx', title:'Warp transitions (zoom-blur / ripple)',
  desc:'A cada clique, a transição empurra as UVs radialmente a partir do centro e acumula 8 amostras ao longo dessa direção (zoom-blur multi-sample), somando um ripple senoidal no raio; o mix entre as cenas acontece dentro do borrão.',
  tags:['zoom blur','radial warp','ripple','multi-sample'],
  stage:'flush', hint:'clique',
  html:`
    <div class="fx09">
      <canvas class="fx09-cv"></canvas>
      <div class="fx09-fb" hidden>WebGL indisponível</div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/?s=webgl+image+transitions" target="_blank" rel="noopener">Codrops — Creative WebGL Image Transitions</a><a href="https://tympanus.net/codrops/2019/11/05/interactive-webgl-hover-effects/" target="_blank" rel="noopener">Interactive WebGL Hover Effects</a></div>
    </div>`,
  css:`
    .fx09{position:relative;width:100%;height:100%;background:#0a0908}
    .fx09-cv{width:100%;height:100%;display:block;cursor:pointer}
    .fx09-fb{position:absolute;inset:0;display:grid;place-items:center;font-size:12px;color:#d7d7e2;
      background:linear-gradient(#362540,#241f14)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx09-cv');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.hidden = true; root.querySelector('.fx09-fb').hidden = false; return; }
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    gl.viewport(0,0,w,h);

    // três cenas com paletas da casa: dourado, ameixa, verde
    function cena(i){
      var pal = [
        ['#2a1a08','#b8871f','#e8c96a','#1c1206'],
        ['#12101c','#6f4f86','#b08ac9','#0c0a16'],
        ['#0a1410','#2b5c40','#5cc88f','#050a08']
      ][i];
      var c = document.createElement('canvas'); c.width = 512; c.height = 320;
      var g = c.getContext('2d');
      var grd = g.createLinearGradient(0,0,0,320);
      grd.addColorStop(0,pal[0]); grd.addColorStop(.6,pal[1]); grd.addColorStop(1,pal[2]);
      g.fillStyle = grd; g.fillRect(0,0,512,320);
      g.fillStyle = pal[2];
      g.beginPath(); g.arc(120 + i*130, 110, 34, 0, 6.284); g.fill();
      g.fillStyle = pal[3];
      g.beginPath(); g.moveTo(0,320);
      for (var x = 0; x <= 512; x += 10)
        g.lineTo(x, 245 - Math.abs(Math.sin(x*.018 + i*2.4))*58);
      g.lineTo(512,320); g.closePath(); g.fill();
      g.fillStyle = '#ffffffcc'; g.font = '700 26px Georgia,serif'; g.textAlign = 'center';
      g.fillText('CENA ' + (i+1), 256, 60);
      return c;
    }

    function compilar(vs,fs){
      function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); return o; }
      var p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p); return p;
    }
    function textura(cnv,unidade){
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    var prog = compilar(
      'attribute vec2 aP; varying vec2 vUV;' +
      'void main(){ vUV = aP*.5+.5; gl_Position = vec4(aP,0.,1.); }',
      'precision mediump float; varying vec2 vUV;' +
      'uniform sampler2D uA, uB; uniform float uP;' +
      'void main(){' +
      '  vec2 dir = vUV - .5;' +
      '  float r = length(dir);' +
      '  float forca = sin(uP * 3.14159);' +                 // pico no meio da transição
      '  float onda = sin(r * 28. - uP * 12.) * .02 * forca;' +   // ripple radial
      '  vec4 soma = vec4(0.);' +
      '  for (int i = 0; i < 8; i++){' +                     // zoom-blur: 8 amostras radiais
      '    float k = float(i) / 8. * forca * .25;' +
      '    vec2 uv = vUV - dir * k + dir/max(r,.001) * onda;' +
      '    soma += mix(texture2D(uA, uv), texture2D(uB, uv), uP);' +
      '  }' +
      '  gl_FragColor = soma / 8.;' +
      '}');
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var aP = gl.getAttribLocation(prog,'aP');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    var cenas = [cena(0), cena(1), cena(2)];
    textura(cenas[0], 0);
    textura(cenas[1], 1);
    gl.uniform1i(gl.getUniformLocation(prog,'uA'), 0);
    gl.uniform1i(gl.getUniformLocation(prog,'uB'), 1);
    var uP = gl.getUniformLocation(prog,'uP');

    var atual = 0, p = 1, animando = false;
    ctx.on(cv,'click',function(){
      if (animando) return;
      animando = true; p = 0;
      var prox = (atual + 1) % 3;
      textura(cenas[atual], 0);                              // A = cena atual
      textura(cenas[prox], 1);                               // B = destino
      atual = prox;
    });

    ctx.loop(function(){
      if (animando){
        p = Math.min(1, p + .022);
        if (p === 1) animando = false;
      }
      gl.uniform1f(uP, p);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ctx.clean(function(){
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    });
  }
},

{
  id:'fx10', cat:'hoverfx', title:'Galeria velocity skew',
  desc:'A velocidade da rolagem (delta de scrollLeft por frame) vira ângulo de skewX aplicado à fileira, com lerp puxando de volta a zero — os cards entortam na direção do arrasto e relaxam quando o scroll para. Sem WebGL: só DOM, transform e rAF.',
  tags:['scroll velocity','skew','lerp','rAF'],
  stage:'flush', hint:'role a galeria',
  html:`
    <div class="fx10">
      <div class="fx10-vp">
        <div class="fx10-fila">
          <div class="fx10-card c1">01</div><div class="fx10-card c2">02</div>
          <div class="fx10-card c3">03</div><div class="fx10-card c4">04</div>
          <div class="fx10-card c5">05</div><div class="fx10-card c6">06</div>
          <div class="fx10-card c1">07</div><div class="fx10-card c2">08</div>
          <div class="fx10-card c3">09</div><div class="fx10-card c4">10</div>
        </div>
      </div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://tympanus.net/codrops/?s=velocity" target="_blank" rel="noopener">Codrops — scroll velocity galleries</a></div>
    </div>`,
  css:`
    .fx10{width:100%;height:100%;display:flex;align-items:center;background:#0a0908;overflow:hidden}
    .fx10-vp{width:100%;overflow-x:auto;overflow-y:hidden;padding:26px 0;scrollbar-width:none;cursor:grab}
    .fx10-vp::-webkit-scrollbar{display:none}
    .fx10-vp:active{cursor:grabbing}
    .fx10-fila{display:flex;gap:14px;padding:0 22px;width:max-content;will-change:transform}
    .fx10-card{flex:0 0 auto;width:110px;height:140px;border-radius:12px;display:grid;place-items:center;
      font-family:var(--mono);font-size:15px;color:#d7d7e2;border:1px solid #ffffff18;user-select:none}
    .fx10-card.c1{background:linear-gradient(160deg,#3a2410,#b8871f)}
    .fx10-card.c2{background:linear-gradient(160deg,#241b38,#6f4f86)}
    .fx10-card.c3{background:linear-gradient(160deg,#0e2418,#2b5c40)}
    .fx10-card.c4{background:linear-gradient(160deg,#2c2822,#8a6b3f)}
    .fx10-card.c5{background:linear-gradient(160deg,#331d1b,#a04a45)}
    .fx10-card.c6{background:linear-gradient(160deg,#1c2433,#3f5a80)}`,
  js:function(root,ctx){
    var vp = root.querySelector('.fx10-vp');
    var fila = root.querySelector('.fx10-fila');
    var ultimo = vp.scrollLeft, skew = 0;

    // arrasto com o ponteiro (além da roda / trackpad)
    var down = false, lx = 0, sx = 0;
    ctx.on(vp,'pointerdown',function(e){
      down = true; lx = e.clientX; sx = vp.scrollLeft;
      vp.setPointerCapture(e.pointerId);
    });
    ctx.on(vp,'pointermove',function(e){
      if (down) vp.scrollLeft = sx - (e.clientX - lx);
    });
    ctx.on(vp,'pointerup',function(){ down = false; });
    ctx.on(vp,'pointercancel',function(){ down = false; });

    ctx.loop(function(){
      var v = vp.scrollLeft - ultimo;                        // velocidade (px por frame)
      ultimo = vp.scrollLeft;
      var alvo = Math.max(-14, Math.min(14, v * .55));       // clamp do ângulo
      skew += (alvo - skew) * .12;                           // lerp: entorta e relaxa
      fila.style.transform = 'skewX(' + (-skew).toFixed(2) + 'deg)';
    });
  }
}

);
