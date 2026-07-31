/* ==========================================================
   10b · AVANÇADO / WOW — lote 2
   WebGL cru, WebGPU, Worker, física com restrições.
   Nenhuma biblioteca: nem Three.js, nem Matter.js, nem Lottie.
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'ax01', cat:'avancado', title:'3D em WebGL puro',
  desc:'Cubo com iluminação difusa: buffers, shaders e matriz MVP escritos à mão, sem Three.js.',
  tags:['WebGL','shaders','mat4'], stage:'flush', hint:'arraste para girar',
  html:`<canvas class="ax01"></canvas>`,
  css:`.ax01{width:100%;height:100%;display:block;background:#080706;cursor:grab}
       .ax01:active{cursor:grabbing}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax01');
    var gl = cv.getContext('webgl');
    if (!gl){ cv.outerHTML = '<p style="color:#85807a;font-size:12px">WebGL indisponível</p>'; return; }
    var dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr;
    gl.viewport(0,0,cv.width,cv.height);

    function compilar(tipo, src){
      var s = gl.createShader(tipo); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, compilar(gl.VERTEX_SHADER, `
      attribute vec3 pos; attribute vec3 nrm; attribute vec3 cor;
      uniform mat4 mvp; uniform mat4 modelo;
      varying vec3 vN; varying vec3 vC;
      void main(){ vN = mat3(modelo) * nrm; vC = cor; gl_Position = mvp * vec4(pos,1.0); }`));
    gl.attachShader(prog, compilar(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec3 vN; varying vec3 vC;
      void main(){
        vec3 luz = normalize(vec3(.5,.8,.6));
        float d = max(dot(normalize(vN), luz), 0.0);
        gl_FragColor = vec4(vC * (0.32 + 0.78 * d), 1.0);
      }`));
    gl.linkProgram(prog); gl.useProgram(prog);

    // 6 faces × 2 triângulos, com normal e cor por face
    var faces = [
      [[1,0,0],[.83,.69,.22]], [[-1,0,0],[.69,.54,.79]], [[0,1,0],[.36,.78,.56]],
      [[0,-1,0],[.91,.79,.42]], [[0,0,1],[.90,.39,.37]], [[0,0,-1],[.81,.61,.42]]
    ];
    var P = [], N = [], C = [];
    faces.forEach(function(f){
      var n = f[0], cor = f[1];
      var eixo = n[0] ? 0 : n[1] ? 1 : 2, s = n[eixo];
      var quad = [[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]];
      quad.forEach(function(q){
        var v = [0,0,0];
        v[eixo] = s;
        v[(eixo+1)%3] = q[0] * (s > 0 ? 1 : -1);
        v[(eixo+2)%3] = q[1];
        P.push(v[0],v[1],v[2]); N.push(n[0],n[1],n[2]); C.push(cor[0],cor[1],cor[2]);
      });
    });
    function buffer(dados, nome, tam){
      var b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dados), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, nome);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, tam, gl.FLOAT, false, 0, 0);
    }
    buffer(P,'pos',3); buffer(N,'nrm',3); buffer(C,'cor',3);

    function mult(a,b){                                   // multiplicação 4×4
      var o = new Float32Array(16);
      for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++){
        var s = 0;
        for (var k = 0; k < 4; k++) s += a[k*4+j] * b[i*4+k];
        o[i*4+j] = s;
      }
      return o;
    }
    function perspectiva(fov, asp, n, f){
      var t = 1 / Math.tan(fov/2);
      return new Float32Array([t/asp,0,0,0, 0,t,0,0, 0,0,(f+n)/(n-f),-1, 0,0,2*f*n/(n-f),0]);
    }
    function rotXY(rx, ry){
      var cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      return new Float32Array([cy,sy*sx,-sy*cx,0, 0,cx,sx,0, sy,-cy*sx,cy*cx,0, 0,0,-6,1]);
    }
    gl.enable(gl.DEPTH_TEST);
    var rx = -.5, ry = .7, vx = 0, vy = .012, down = false, lx, ly;
    ctx.on(cv,'pointerdown',function(e){ down = true; lx = e.clientX; ly = e.clientY; cv.setPointerCapture(e.pointerId); });
    ctx.on(cv,'pointermove',function(e){
      if (!down) return;
      vy = (e.clientX - lx) * .008; vx = (e.clientY - ly) * .008;
      lx = e.clientX; ly = e.clientY;
    });
    ctx.on(cv,'pointerup',function(){ down = false; });

    var uMvp = gl.getUniformLocation(prog,'mvp'), uMod = gl.getUniformLocation(prog,'modelo');
    ctx.loop(function(){
      if (!down){ vy += (.012 - vy) * .03; vx *= .94; }
      rx += vx; ry += vy;
      var modelo = rotXY(rx, ry);
      var mvp = mult(perspectiva(1, cv.width/cv.height, .1, 100), modelo);
      gl.uniformMatrix4fv(uMvp, false, mvp);
      gl.uniformMatrix4fv(uMod, false, modelo);
      gl.clearColor(.031,.027,.023,1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, P.length/3);
    });
  }
});

add({
  id:'ax02', cat:'avancado', title:'Shader de distorção no hover',
  desc:'A imagem vira textura e um fragment shader empurra as UVs em ondas ao redor do cursor.',
  tags:['GLSL','fragment shader','UV'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="ax02"></canvas>`,
  css:`.ax02{width:100%;height:100%;display:block;background:#080706;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax02'), gl = cv.getContext('webgl');
    if (!gl){ cv.outerHTML = '<p style="color:#85807a;font-size:12px">WebGL indisponível</p>'; return; }
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    gl.viewport(0,0,cv.width,cv.height);

    function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o);
      if (!gl.getShaderParameter(o,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; }
    var p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, `
      attribute vec2 pos; varying vec2 uv;
      void main(){ uv = pos * .5 + .5; gl_Position = vec4(pos,0.,1.); }`));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 uv; uniform sampler2D tex; uniform vec2 mouse; uniform float t; uniform float forca;
      void main(){
        vec2 d = uv - mouse;
        float dist = length(d);
        float onda = sin(dist * 26.0 - t * 3.2) * exp(-dist * 5.0) * 0.055 * forca;
        vec2 novo = uv + normalize(d + 0.0001) * onda;
        // aberração cromática proporcional à distorção
        float a = onda * 0.6;
        gl_FragColor = vec4(
          texture2D(tex, novo + vec2(a,0.)).r,
          texture2D(tex, novo).g,
          texture2D(tex, novo - vec2(a,0.)).b, 1.0);
      }`));
    gl.linkProgram(p); gl.useProgram(p);

    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(p,'pos');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

    // "imagem" gerada em canvas 2D e enviada como textura
    var src = document.createElement('canvas'); src.width = src.height = 512;
    (function(g){
      var grd = g.createLinearGradient(0,0,512,512);
      grd.addColorStop(0,'#b8871f'); grd.addColorStop(.5,'#6f4f86'); grd.addColorStop(1,'#cf9b6a');
      g.fillStyle = grd; g.fillRect(0,0,512,512);
      g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3;
      for (var i = -512; i < 512; i += 26){ g.beginPath(); g.moveTo(i,0); g.lineTo(i+512,512); g.stroke(); }
      g.fillStyle = '#1b1813'; g.font = '700 74px Inter,sans-serif'; g.textAlign = 'center';
      g.fillText('SHADER', 256, 240);
      g.font = '400 26px monospace'; g.fillText('GLSL · sem libs', 256, 290);
    })(src.getContext('2d'));
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

    var uM = gl.getUniformLocation(p,'mouse'), uT = gl.getUniformLocation(p,'t'),
        uF = gl.getUniformLocation(p,'forca');
    var mx = .5, my = .5, f = 0, alvo = 0, t = 0;
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width; my = 1 - (e.clientY - r.top) / r.height; alvo = 1;
    });
    ctx.on(cv,'mouseleave',function(){ alvo = 0; });
    ctx.loop(function(){
      t += .05; f += (alvo - f) * .07;
      gl.uniform2f(uM, mx, my); gl.uniform1f(uT, t); gl.uniform1f(uF, .25 + f);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
  }
});

add({
  id:'ax03', cat:'avancado', title:'Transição por displacement map',
  desc:'Um mapa de ruído decide, pixel a pixel, quando cada ponto troca de imagem.',
  tags:['WebGL','displacement','transição'], stage:'flush', hint:'clique para trocar',
  html:`<canvas class="ax03"></canvas>`,
  css:`.ax03{width:100%;height:100%;display:block;background:#080706;cursor:pointer}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax03'), gl = cv.getContext('webgl');
    if (!gl){ cv.outerHTML = '<p style="color:#85807a;font-size:12px">WebGL indisponível</p>'; return; }
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    gl.viewport(0,0,cv.width,cv.height);
    function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o);
      if (!gl.getShaderParameter(o,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; }
    var p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER,
      'attribute vec2 pos; varying vec2 uv; void main(){ uv = pos*.5+.5; gl_Position = vec4(pos,0.,1.); }'));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 uv; uniform sampler2D a; uniform sampler2D b; uniform sampler2D disp; uniform float prog;
      void main(){
        float d = texture2D(disp, uv).r;
        // cada pixel troca num "tempo" próprio, ditado pelo ruído
        float k = clamp((prog * 1.6 - d * 0.6) * 2.2, 0.0, 1.0);
        vec2 ua = uv + vec2(d - .5) * (1.0 - k) * 0.12;
        vec2 ub = uv - vec2(d - .5) * k * 0.12;
        gl_FragColor = mix(texture2D(a, ua), texture2D(b, ub), k);
      }`));
    gl.linkProgram(p); gl.useProgram(p);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    var lp = gl.getAttribLocation(p,'pos');
    gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);

    function textura(desenhar, unidade){
      var c = document.createElement('canvas'); c.width = c.height = 256;
      desenhar(c.getContext('2d'));
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      return t;
    }
    function cena(cor1, cor2, txt){
      return function(g){
        var grd = g.createLinearGradient(0,0,256,256);
        grd.addColorStop(0,cor1); grd.addColorStop(1,cor2);
        g.fillStyle = grd; g.fillRect(0,0,256,256);
        g.fillStyle = 'rgba(255,255,255,.95)'; g.font = '800 110px Inter,sans-serif'; g.textAlign = 'center';
        g.fillText(txt, 128, 168);
      };
    }
    textura(cena('#b8871f','#2a2340','A'), 0);
    textura(cena('#c9762f','#7c2d12','B'), 1);
    textura(function(g){                                   // mapa de ruído em nuvem
      var img = g.createImageData(256,256), d = img.data;
      for (var y = 0; y < 256; y++) for (var x = 0; x < 256; x++){
        var v = (Math.sin(x*.06) + Math.cos(y*.05) + Math.sin((x+y)*.03)) / 3;
        v = (v + 1) / 2 * 255;
        var i = (y*256+x)*4; d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      g.putImageData(img,0,0);
    }, 2);
    gl.uniform1i(gl.getUniformLocation(p,'a'), 0);
    gl.uniform1i(gl.getUniformLocation(p,'b'), 1);
    gl.uniform1i(gl.getUniformLocation(p,'disp'), 2);
    var uP = gl.getUniformLocation(p,'prog');

    var prog = 0, alvo = 0;
    ctx.on(cv,'click',function(){ alvo = alvo > .5 ? 0 : 1; });
    ctx.every(function(){ alvo = alvo > .5 ? 0 : 1; }, 3600);
    ctx.loop(function(){
      prog += (alvo - prog) * .045;
      gl.uniform1f(uP, prog);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
  }
});

add({
  id:'ax04', cat:'avancado', title:'120 mil partículas em GPU',
  desc:'A posição de cada ponto é calculada no vertex shader a partir de uma semente — a CPU não toca nelas.',
  tags:['WebGL','gl.POINTS','GPU'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="ax04"></canvas>`,
  css:`.ax04{width:100%;height:100%;display:block;background:#060504;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax04'), gl = cv.getContext('webgl');
    if (!gl){ cv.outerHTML = '<p style="color:#85807a;font-size:12px">WebGL indisponível</p>'; return; }
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    gl.viewport(0,0,cv.width,cv.height);
    function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o);
      if (!gl.getShaderParameter(o,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; }
    var p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, `
      attribute vec2 semente; uniform float t; uniform vec2 mouse; varying float vI;
      void main(){
        float a = semente.x * 6.2831;
        float r = 0.15 + semente.y * 0.85;
        // órbita com deriva: raio e ângulo variam no tempo
        float ang = a + t * (0.25 + semente.y * 0.6);
        vec2 pos = vec2(cos(ang), sin(ang) * 0.55) * r;
        pos.y += sin(t * 0.8 + semente.x * 12.0) * 0.08;
        vec2 d = pos - mouse;
        float f = exp(-dot(d,d) * 9.0);
        pos += normalize(d + 0.0001) * f * 0.28;          // repelidas pelo cursor
        vI = f + (1.0 - r) * 0.5;
        gl_PointSize = 1.0 + f * 3.0;
        gl_Position = vec4(pos, 0.0, 1.0);
      }`));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, `
      precision mediump float; varying float vI;
      void main(){
        vec3 c = mix(vec3(.83,.69,.22), vec3(.98,.72,.45), clamp(vI,0.,1.));
        gl_FragColor = vec4(c, 0.55);
      }`));
    gl.linkProgram(p); gl.useProgram(p);

    var N = 120000, dados = new Float32Array(N * 2);
    for (var i = 0; i < N; i++){ dados[i*2] = Math.random(); dados[i*2+1] = Math.random(); }
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, dados, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(p,'semente');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    var uT = gl.getUniformLocation(p,'t'), uM = gl.getUniformLocation(p,'mouse');
    var mx = 2, my = 2, t = 0;
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width * 2 - 1;
      my = 1 - (e.clientY - r.top) / r.height * 2;
    });
    ctx.on(cv,'mouseleave',function(){ mx = my = 2; });
    ctx.loop(function(){
      t += .012;
      gl.clearColor(.016,.016,.039,1); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, t); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.POINTS, 0, N);
    });
  }
});

add({
  id:'ax05', cat:'avancado', title:'Simulação de fluido',
  desc:'Stable Fluids do Jos Stam: fontes → projeção → advecção semi-lagrangiana → projeção.',
  tags:['Navier-Stokes','advecção','projeção'], stage:'flush', hint:'arraste para injetar tinta',
  html:`<canvas class="ax05"></canvas>`,
  css:`.ax05{width:100%;height:100%;display:block;background:#070605;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax05'), c = cv.getContext('2d');
    var N = 52, T = N + 2, S = T * T, dt = .12, ITER = 16;
    cv.width = N; cv.height = N;
    cv.style.width = '100%'; cv.style.height = '100%';
    function IX(i,j){ return i + T * j; }
    function campo(){ return new Float32Array(S); }

    // velocidade, densidade e as fontes que serão somadas a cada passo
    var u = campo(), v = campo(), d = campo();
    var u0 = campo(), v0 = campo(), d0 = campo();
    var uS = campo(), vS = campo(), dS = campo();

    /* b indica o que espelhar na parede: 1 = componente x, 2 = componente y */
    function bordas(b, x){
      for (var i = 1; i <= N; i++){
        x[IX(0,i)]   = b === 1 ? -x[IX(1,i)] : x[IX(1,i)];
        x[IX(N+1,i)] = b === 1 ? -x[IX(N,i)] : x[IX(N,i)];
        x[IX(i,0)]   = b === 2 ? -x[IX(i,1)] : x[IX(i,1)];
        x[IX(i,N+1)] = b === 2 ? -x[IX(i,N)] : x[IX(i,N)];
      }
    }

    /* advecção semi-lagrangiana: de onde veio a partícula que agora está aqui? */
    function advectar(b, x, x0, uu, vv){
      var dt0 = dt * N;
      for (var j = 1; j <= N; j++){
        for (var i = 1; i <= N; i++){
          var xx = i - dt0 * uu[IX(i,j)], yy = j - dt0 * vv[IX(i,j)];
          if (xx < .5) xx = .5; if (xx > N + .5) xx = N + .5;
          if (yy < .5) yy = .5; if (yy > N + .5) yy = N + .5;
          var i0 = xx | 0, j0 = yy | 0;
          var s1 = xx - i0, s0 = 1 - s1, t1 = yy - j0, t0 = 1 - t1;
          x[IX(i,j)] = s0 * (t0 * x0[IX(i0,j0)] + t1 * x0[IX(i0,j0+1)]) +
                       s1 * (t0 * x0[IX(i0+1,j0)] + t1 * x0[IX(i0+1,j0+1)]);
        }
      }
      bordas(b, x);
    }

    /* projeção: tira a divergência do campo — sem isso o fluido "aparece do nada" */
    function projetar(uu, vv, p, div){
      var i, j, k;
      for (j = 1; j <= N; j++) for (i = 1; i <= N; i++){
        div[IX(i,j)] = -.5 * (uu[IX(i+1,j)] - uu[IX(i-1,j)] + vv[IX(i,j+1)] - vv[IX(i,j-1)]) / N;
        p[IX(i,j)] = 0;
      }
      bordas(0, div); bordas(0, p);
      for (k = 0; k < ITER; k++){                       // Gauss-Seidel na equação de Poisson
        for (j = 1; j <= N; j++) for (i = 1; i <= N; i++)
          p[IX(i,j)] = (div[IX(i,j)] + p[IX(i-1,j)] + p[IX(i+1,j)] + p[IX(i,j-1)] + p[IX(i,j+1)]) / 4;
        bordas(0, p);
      }
      for (j = 1; j <= N; j++) for (i = 1; i <= N; i++){
        uu[IX(i,j)] -= .5 * N * (p[IX(i+1,j)] - p[IX(i-1,j)]);
        vv[IX(i,j)] -= .5 * N * (p[IX(i,j+1)] - p[IX(i,j-1)]);
      }
      bordas(1, uu); bordas(2, vv);
    }

    /* a fonte é espalhada numa mancha: um impulso de uma célula só é
       divergência pura, e a projeção — que existe para remover divergência —
       apagaria ele inteiro no mesmo passo. */
    function sopro(ci, cj, fx, fy, tinta, raio){
      for (var a = -raio; a <= raio; a++){
        for (var b = -raio; b <= raio; b++){
          var i = ci + a, j = cj + b;
          if (i < 1 || j < 1 || i > N || j > N) continue;
          var peso = 1 - Math.hypot(a,b) / (raio + 1);
          if (peso <= 0) continue;
          uS[IX(i,j)] += fx * peso;
          vS[IX(i,j)] += fy * peso;
          dS[IX(i,j)] += tinta * peso;
        }
      }
    }

    var mx = 0, my = 0, pmx = 0, pmy = 0, down = false, t = 0;
    function paraGrade(e){
      var r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width * N, (e.clientY - r.top) / r.height * N];
    }
    ctx.on(cv,'pointerdown',function(e){
      var p = paraGrade(e);
      down = true; pmx = mx = p[0]; pmy = my = p[1];
      cv.setPointerCapture(e.pointerId);
    });
    ctx.on(cv,'pointermove',function(e){
      var p = paraGrade(e);
      pmx = mx; pmy = my; mx = p[0]; my = p[1];
      if (!down) return;
      // a força vem do deslocamento do ponteiro, limitada ao que o passo aguenta
      var fx = Math.max(-14, Math.min(14, (mx - pmx) * 5));
      var fy = Math.max(-14, Math.min(14, (my - pmy) * 5));
      sopro(mx | 0, my | 0, fx, fy, 220, 2);
    });
    ctx.on(cv,'pointerup',function(){ down = false; });
    ctx.on(cv,'pointerleave',function(){ down = false; });

    ctx.loop(function(){
      t += 1;
      // pluma permanente na base, com bamboleio em duas frequências para
      // não virar uma coluna reta nem repetir o mesmo caminho
      sopro((N/2 + Math.sin(t * .017) * 8) | 0, N - 6,
            Math.sin(t * .031) * 5 + Math.sin(t * .0083) * 4, -11, 150, 2);

      var k;
      for (k = 0; k < S; k++){                          // add_source: x += dt * fonte
        u[k] += dt * uS[k]; v[k] += dt * vS[k]; d[k] += dt * dS[k];
        uS[k] = vS[k] = dS[k] = 0;
      }
      projetar(u, v, u0, v0);
      u0.set(u); v0.set(v);
      advectar(1, u, u0, u0, v0);
      advectar(2, v, v0, u0, v0);
      projetar(u, v, u0, v0);
      d0.set(d);
      advectar(0, d, d0, u, v);
      for (k = 0; k < S; k++) d[k] *= .990;             // a tinta se dissipa

      var img = c.createImageData(N, N), px = img.data;
      for (var j = 0; j < N; j++){
        for (var i = 0; i < N; i++){
          var id = IX(i+1, j+1);
          // corta o piso: sem isso a tinta residual vira névoa no quadro inteiro
          var val = Math.max(0, Math.min(1, d[id] / 18) - .07) / .93;
          val = val * val * (3 - 2 * val);
          var vel = Math.min(1, Math.hypot(u[id], v[id]) * 1.6);
          var o = (j * N + i) * 4;
          px[o]     = 255 * Math.min(1, val * 1.15);                 // ouro esquenta
          px[o + 1] = 255 * Math.min(1, val * (.72 + vel * .18));
          px[o + 2] = 255 * Math.min(1, val * (.22 + vel * .5));     // azul só onde corre rápido
          px[o + 3] = 255;
        }
      }
      c.putImageData(img, 0, 0);
    });
  }
});

add({
  id:'ax06', cat:'avancado', title:'Ray marching',
  desc:'Nenhuma geometria: o shader caminha pelo raio até encontrar a superfície descrita por uma SDF.',
  tags:['SDF','ray marching','GLSL'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="ax06"></canvas>`,
  css:`.ax06{width:100%;height:100%;display:block;background:#070605;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax06'), gl = cv.getContext('webgl');
    if (!gl){ cv.outerHTML = '<p style="color:#85807a;font-size:12px">WebGL indisponível</p>'; return; }
    cv.width = cv.offsetWidth * .75; cv.height = cv.offsetHeight * .75;   // meia resolução: é caro
    cv.style.width = '100%'; cv.style.height = '100%';
    gl.viewport(0,0,cv.width,cv.height);
    function sh(t,s){ var o = gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o);
      if (!gl.getShaderParameter(o,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; }
    var p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER,
      'attribute vec2 pos; void main(){ gl_Position = vec4(pos,0.,1.); }'));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, `
      precision highp float;
      uniform vec2 res; uniform float t; uniform vec2 mouse;

      float sdEsfera(vec3 p, float r){ return length(p) - r; }
      float sdCaixa(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q,0.)) + min(max(q.x,max(q.y,q.z)),0.); }
      float suave(float a, float b, float k){
        float h = clamp(.5 + .5*(b-a)/k, 0., 1.);
        return mix(b, a, h) - k*h*(1.-h);
      }
      float mapa(vec3 p){
        float d = sdEsfera(p - vec3(sin(t)*.9, 0., 0.), .62);
        d = suave(d, sdEsfera(p - vec3(-sin(t)*.9, cos(t*.7)*.5, 0.), .5), .55);
        d = suave(d, sdCaixa(p - vec3(0., -1.15, 0.), vec3(2.2,.08,2.2)), .35);
        return d;
      }
      vec3 normal(vec3 p){
        vec2 e = vec2(.001,0.);
        return normalize(vec3(mapa(p+e.xyy)-mapa(p-e.xyy),
                              mapa(p+e.yxy)-mapa(p-e.yxy),
                              mapa(p+e.yyx)-mapa(p-e.yyx)));
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy - .5*res) / res.y;
        vec3 ro = vec3(mouse.x*1.6, .35 + mouse.y*.8, 3.2);
        vec3 rd = normalize(vec3(uv, -1.4));
        float dist = 0.;
        float d;
        vec3 p;
        for (int i = 0; i < 64; i++){
          p = ro + rd * dist;
          d = mapa(p);
          if (d < .001 || dist > 12.) break;
          dist += d;
        }
        vec3 cor = vec3(.045,.04,.035);
        if (d < .01){
          vec3 n = normal(p);
          vec3 luz = normalize(vec3(.7,.9,.5));
          float dif = max(dot(n,luz), 0.);
          float esp = pow(max(dot(reflect(-luz,n), -rd), 0.), 32.);
          float ao = 1. - float(dist) * .06;
          cor = (vec3(.84,.68,.24) * dif + vec3(1.,.88,.62) * esp) * ao + vec3(.07,.06,.05);
        }
        gl_FragColor = vec4(sqrt(cor), 1.);
      }`));
    gl.linkProgram(p); gl.useProgram(p);
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(p,'pos');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    var uR = gl.getUniformLocation(p,'res'), uT = gl.getUniformLocation(p,'t'),
        uM = gl.getUniformLocation(p,'mouse');
    gl.uniform2f(uR, cv.width, cv.height);
    var mx = 0, my = 0, t = 0;
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - .5; my = .5 - (e.clientY - r.top) / r.height;
    });
    ctx.loop(function(){
      t += .014;
      gl.uniform1f(uT, t); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
  }
});

add({
  id:'ax07', cat:'avancado', title:'Vídeo scrubbado pelo scroll',
  desc:'Um <video> de verdade, gravado na hora com MediaRecorder, com currentTime amarrado à rolagem.',
  tags:['video','MediaRecorder','scrub'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="ax07">
      <div class="ax07-pin">
        <video class="ax07-v" muted playsinline></video>
        <canvas class="ax07-fb"></canvas>
        <b class="ax07-s">gravando o vídeo…</b>
      </div>
    </div>`,
  css:`
    .ax07{height:980px}
    .ax07-pin{position:sticky;top:0;height:230px;display:grid;place-items:center;background:#080706;overflow:hidden}
    .ax07-v,.ax07-fb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .ax07-v{opacity:0;transition:opacity .4s}
    .ax07.ok .ax07-v{opacity:1}
    .ax07.ok .ax07-fb{opacity:0}
    .ax07-s{position:absolute;left:12px;top:10px;font-family:var(--mono);font-size:10px;color:#908b82;
      background:#0009;padding:2px 7px;border-radius:5px}`,
  js:function(root,ctx){
    var box = root.querySelector('.ax07'),
        stage = root.closest('.stage'),
        vid = root.querySelector('.ax07-v'),
        fb = root.querySelector('.ax07-fb'),
        st = root.querySelector('.ax07-s');
    var W = 320, H = 230, DUR = 3000;
    fb.width = W; fb.height = H;
    var g = fb.getContext('2d');

    function desenhar(g, k){                       // o "filme": um anel que se desenrola
      g.fillStyle = '#080706'; g.fillRect(0,0,W,H);
      var cx = W/2, cy = H/2;
      for (var i = 0; i < 5; i++){
        g.beginPath();
        var R = 26 + i * 15;
        g.arc(cx, cy, R, -Math.PI/2, -Math.PI/2 + k * Math.PI * 2 * (1 + i * .2));
        g.strokeStyle = 'hsl(' + (28 + i * 9 + k * 26) + ',74%,60%)';
        g.lineWidth = 7; g.lineCap = 'round'; g.stroke();
      }
      g.fillStyle = '#fff'; g.font = '700 26px Inter,sans-serif'; g.textAlign = 'center';
      g.fillText(Math.round(k * 100) + '%', cx, cy + 9);
    }
    desenhar(g, 0);

    // grava o canvas em um vídeo real e depois o usa como mídia scrubbável
    var pronto = false;
    try {
      var stream = fb.captureStream(30), rec = new MediaRecorder(stream), pedacos = [];
      rec.ondataavailable = function(e){ if (e.data.size) pedacos.push(e.data); };
      rec.onstop = function(){
        vid.src = URL.createObjectURL(new Blob(pedacos, { type:'video/webm' }));
        vid.onloadeddata = function(){ pronto = true; box.classList.add('ok'); st.textContent = 'vídeo real · currentTime ← scroll'; upd(); };
      };
      rec.start();
      var t0 = performance.now();
      (function grava(){
        var k = Math.min(1, (performance.now() - t0) / DUR);
        desenhar(g, k);
        if (k < 1) ctx.raf(grava); else rec.stop();
      })();
    } catch (e) {
      st.textContent = 'sem MediaRecorder — usando frames em canvas';
    }

    function upd(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? Math.min(1, Math.max(0, stage.scrollTop / max)) : 0;
      if (pronto && vid.duration) vid.currentTime = k * (vid.duration - .05);
      else desenhar(g, k);                          // fallback: redesenha o frame
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
});

add({
  id:'ax08', cat:'avancado', title:'Player de animação por JSON',
  desc:'O princípio do Lottie em 40 linhas: keyframes num objeto, interpolação e aplicação no SVG.',
  tags:['keyframes','JSON','interpolação'], hint:'arraste a linha do tempo',
  html:`
    <div class="ax08">
      <svg viewBox="0 0 200 120">
        <circle class="bola" cx="0" cy="0" r="16"/>
        <rect class="barra" x="0" y="96" width="0" height="6" rx="3"/>
        <text class="rot" x="100" y="26" text-anchor="middle">…</text>
      </svg>
      <input class="ax08-t" type="range" min="0" max="1000" value="0">
      <div class="ax08-b"><button class="play">⏸ pausar</button><small>t = 0.00s</small></div>
    </div>`,
  css:`
    .ax08{width:240px}
    .ax08 svg{width:100%;height:124px;background:#131211;border-radius:10px}
    .ax08 .bola{fill:#d4af37}
    .ax08 .barra{fill:#b08ac9}
    .ax08 .rot{fill:#736f68;font-size:10px;font-family:var(--mono)}
    .ax08-t{width:100%;margin-top:10px;accent-color:#d4af37}
    .ax08-b{display:flex;align-items:center;gap:10px;margin-top:6px}
    .ax08-b button{padding:5px 11px;border-radius:7px;background:#22201a;color:#e8e5df;font-size:11px}
    .ax08-b small{font-family:var(--mono);font-size:10px;color:#66625a}`,
  js:function(root,ctx){
    // ---- o "arquivo" de animação ----
    var anim = {
      dur: 2400,
      camadas: {
        bola: { cx:[[0,20],[.35,100],[.7,180],[1,20]],
                cy:[[0,60],[.18,26],[.35,60],[.52,32],[.7,60],[1,60]],
                r: [[0,16],[.35,11],[.36,19],[.5,16],[1,16]] },
        barra:{ width:[[0,0],[1,200]] },
        rot:  { texto:[[0,'início'],[.35,'meio'],[.7,'quase'],[1,'fim']] }
      }
    };
    function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
    function valor(kfs, k){
      for (var i = 0; i < kfs.length - 1; i++){
        if (k >= kfs[i][0] && k <= kfs[i+1][0]){
          var a = kfs[i], b = kfs[i+1];
          if (typeof a[1] === 'string') return a[1];
          var f = ease((k - a[0]) / (b[0] - a[0] || 1));
          return a[1] + (b[1] - a[1]) * f;
        }
      }
      return kfs[kfs.length-1][1];
    }
    var alvos = { bola:root.querySelector('.bola'), barra:root.querySelector('.barra'), rot:root.querySelector('.rot') };
    function aplicar(k){
      Object.keys(anim.camadas).forEach(function(nome){
        var props = anim.camadas[nome], el = alvos[nome];
        Object.keys(props).forEach(function(p){
          var v = valor(props[p], k);
          if (p === 'texto') el.textContent = v;
          else el.setAttribute(p, typeof v === 'number' ? v.toFixed(2) : v);
        });
      });
    }
    var slider = root.querySelector('.ax08-t'), out = root.querySelector('.ax08-b small'),
        btn = root.querySelector('.play'), tocando = true, t = 0, last = performance.now();

    ctx.on(slider,'input',function(){ tocando = false; btn.textContent = '▶ tocar'; t = slider.value/1000 * anim.dur; });
    ctx.on(btn,'click',function(){ tocando = !tocando; btn.textContent = tocando ? '⏸ pausar' : '▶ tocar'; last = performance.now(); });
    ctx.loop(function(){
      var agora = performance.now();
      if (tocando){ t = (t + (agora - last)) % anim.dur; slider.value = t / anim.dur * 1000; }
      last = agora;
      var k = t / anim.dur;
      aplicar(k);
      out.textContent = 't = ' + (t/1000).toFixed(2) + 's';
    });
  }
});

add({
  id:'ax09', cat:'avancado', title:'Física com restrições',
  desc:'Verlet + restrições de distância: a mesma rotina faz corda, tecido e boneco articulado.',
  tags:['verlet','constraints','corda'], stage:'flush', hint:'arraste os pontos',
  html:`<canvas class="ax09"></canvas>`,
  css:`.ax09{width:100%;height:100%;display:block;background:#0d0c0b;cursor:grab}
       .ax09:active{cursor:grabbing}`,
  js:function(root,ctx){
    var cv = root.querySelector('.ax09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var P = [], L = [];
    function pt(x,y,fixo){ P.push({ x:x, y:y, px:x, py:y, fixo:!!fixo }); return P.length-1; }
    function liga(a,b){ L.push({ a:a, b:b, d:Math.hypot(P[a].x-P[b].x, P[a].y-P[b].y) }); }

    // corda pendurada
    var ancora = pt(w*.18, 22, true), ant = ancora;
    for (var i = 1; i <= 12; i++){ var n = pt(w*.18, 22 + i*11); liga(ant, n); ant = n; }
    // tecido 5×4
    var base = P.length, C = 5, R = 4, ox = w*.5, oy = 24, G = 20;
    for (var y = 0; y < R; y++) for (var x = 0; x < C; x++) pt(ox + x*G, oy + y*G, y === 0 && x % 2 === 0);
    for (var y2 = 0; y2 < R; y2++) for (var x2 = 0; x2 < C; x2++){
      if (x2 < C-1) liga(base + y2*C + x2, base + y2*C + x2 + 1);
      if (y2 < R-1) liga(base + y2*C + x2, base + (y2+1)*C + x2);
    }
    var arraste = null;
    ctx.on(cv,'pointerdown',function(e){
      var r = cv.getBoundingClientRect(), mx = e.clientX-r.left, my = e.clientY-r.top;
      var melhor = -1, dm = 22;
      P.forEach(function(p,i){ var d = Math.hypot(p.x-mx, p.y-my); if (d < dm){ dm = d; melhor = i; } });
      if (melhor > -1){ arraste = melhor; cv.setPointerCapture(e.pointerId); }
    });
    ctx.on(cv,'pointermove',function(e){
      if (arraste === null) return;
      var r = cv.getBoundingClientRect();
      P[arraste].x = e.clientX - r.left; P[arraste].y = e.clientY - r.top;
      P[arraste].px = P[arraste].x; P[arraste].py = P[arraste].y;
    });
    ctx.on(cv,'pointerup',function(){ arraste = null; });

    ctx.loop(function(){
      P.forEach(function(p,i){
        if (p.fixo || i === arraste) return;
        var vx = (p.x - p.px) * .99, vy = (p.y - p.py) * .99;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + .42;
        if (p.y > h-3){ p.y = h-3; p.py = p.y + vy * .4; }
        if (p.x < 3){ p.x = 3; } if (p.x > w-3){ p.x = w-3; }
      });
      for (var k = 0; k < 6; k++){                      // resolve as restrições
        L.forEach(function(l){
          var a = P[l.a], b = P[l.b];
          var dx = b.x-a.x, dy = b.y-a.y, d = Math.hypot(dx,dy) || .01;
          var f = (d - l.d) / d * .5;
          var ax = dx*f, ay = dy*f;
          if (!a.fixo && l.a !== arraste){ a.x += ax; a.y += ay; }
          if (!b.fixo && l.b !== arraste){ b.x -= ax; b.y -= ay; }
        });
      }
      c.clearRect(0,0,w,h);
      c.strokeStyle = 'rgba(212,175,55,.55)'; c.lineWidth = 1.4;
      c.beginPath();
      L.forEach(function(l){ c.moveTo(P[l.a].x,P[l.a].y); c.lineTo(P[l.b].x,P[l.b].y); });
      c.stroke();
      P.forEach(function(p,i){
        c.fillStyle = p.fixo ? '#e5645f' : (i === arraste ? '#e8c96a' : '#b08ac9');
        c.beginPath(); c.arc(p.x,p.y, p.fixo ? 3.6 : 2.6, 0, 6.284); c.fill();
      });
    });
  }
});

add({
  id:'ax10', cat:'avancado', title:'Timeline compartilhada (WAAPI)',
  desc:'Várias animações num mesmo controle: currentTime e playbackRate dão scrub e câmera lenta.',
  tags:['Web Animations API','scrub','playbackRate'], hint:'arraste a barra',
  html:`
    <div class="ax10">
      <div class="ax10-p">
        <i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>
      </div>
      <input class="ax10-s" type="range" min="0" max="1000" value="0">
      <div class="ax10-c">
        <button data-r="0">⏸</button><button data-r="0.25">0,25×</button>
        <button data-r="1" class="on">1×</button><button data-r="2">2×</button>
      </div>
    </div>`,
  css:`
    .ax10{width:240px}
    .ax10-p{position:relative;height:120px;border-radius:11px;background:#131211;overflow:hidden}
    .ax10-p i{position:absolute;display:block;border-radius:8px}
    .ax10-p .a{width:34px;height:34px;background:#d4af37;left:14px;top:14px}
    .ax10-p .b{width:26px;height:26px;background:#b08ac9;left:14px;top:60px;border-radius:50%}
    .ax10-p .c{width:20px;height:60px;background:#5cc88f;right:20px;top:30px}
    .ax10-p .d{width:150px;height:3px;background:#e8c96a;left:14px;bottom:14px;transform-origin:0 50%}
    .ax10-s{width:100%;margin-top:10px;accent-color:#d4af37}
    .ax10-c{display:flex;gap:5px;margin-top:6px}
    .ax10-c button{flex:1;padding:6px;border-radius:7px;background:#1d1b16;color:#8a857c;font-size:11px;transition:.2s}
    .ax10-c button.on{background:#d4af3722;color:#d4af37}`,
  js:function(root,ctx){
    var DUR = 3000, sl = root.querySelector('.ax10-s'), anims = [];
    function anim(sel, kfs, atraso){
      var a = root.querySelector(sel).animate(kfs, {
        duration: DUR - (atraso||0), delay: atraso||0, iterations: Infinity,
        easing: 'cubic-bezier(.45,0,.55,1)', direction:'alternate'
      });
      anims.push(a); return a;
    }
    anim('.a', [{ transform:'translate(0,0) rotate(0)' },{ transform:'translate(170px,66px) rotate(225deg)' }], 0);
    anim('.b', [{ transform:'translate(0,0) scale(1)' },{ transform:'translate(180px,-14px) scale(1.9)' }], 200);
    anim('.c', [{ transform:'scaleY(1)', opacity:1 },{ transform:'scaleY(.25)', opacity:.4 }], 400);
    anim('.d', [{ transform:'scaleX(0)' },{ transform:'scaleX(1)' }], 0);

    var arrastando = false;
    ctx.on(sl,'pointerdown',function(){ arrastando = true; anims.forEach(function(a){ a.pause(); }); });
    ctx.on(sl,'input',function(){
      anims.forEach(function(a){ a.currentTime = sl.value/1000 * DUR; });
    });
    ctx.on(document,'pointerup',function(){
      if (!arrastando) return;
      arrastando = false;
      var r = +root.querySelector('.ax10-c .on').dataset.r;
      if (r > 0) anims.forEach(function(a){ a.play(); });
    });
    root.querySelectorAll('.ax10-c button').forEach(function(b){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.ax10-c button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var r = +b.dataset.r;
        anims.forEach(function(a){ if (r === 0) a.pause(); else { a.playbackRate = r; a.play(); } });
      });
    });
    ctx.loop(function(){
      if (arrastando) return;
      var t = anims[0].currentTime || 0;
      sl.value = (t % DUR) / DUR * 1000;
    });
  }
});

add({
  id:'ax11', cat:'avancado', title:'OffscreenCanvas em Worker',
  desc:'O desenho roda em outra thread: mesmo travando a principal por 1s, a animação não perde um frame.',
  tags:['Worker','OffscreenCanvas','thread'], stage:'flush', hint:'clique em travar a main',
  html:`
    <div class="ax11">
      <div class="ax11-col"><canvas class="w"></canvas><small>Worker</small></div>
      <div class="ax11-col"><canvas class="m"></canvas><small>Main thread</small></div>
      <button class="ax11-b">travar a main por 1s</button>
    </div>`,
  css:`
    .ax11{position:relative;width:100%;height:100%;display:flex;gap:8px;padding:10px 10px 42px;background:#0a0908}
    .ax11-col{flex:1;position:relative;border-radius:9px;overflow:hidden;background:#100f0e}
    .ax11-col canvas{width:100%;height:100%;display:block}
    .ax11-col small{position:absolute;left:7px;top:6px;font-family:var(--mono);font-size:9px;color:#85807a}
    .ax11-b{position:absolute;left:10px;right:10px;bottom:10px;padding:7px;border-radius:8px;
      background:#e5645f;color:#2a0710;font-size:11.5px;font-weight:700}`,
  js:function(root,ctx){
    var cw = root.querySelector('.w'), cm = root.querySelector('.m');
    var W = cw.width = cw.offsetWidth, H = cw.height = cw.offsetHeight;
    cm.width = cm.offsetWidth; cm.height = cm.offsetHeight;

    // main thread: mesma animação, mas refém de qualquer travamento
    var g = cm.getContext('2d'), t = 0;
    ctx.loop(function(){
      t += .04;
      g.fillStyle = '#100f0e'; g.fillRect(0,0,cm.width,cm.height);
      for (var i = 0; i < 3; i++){
        g.beginPath();
        g.arc(cm.width/2 + Math.cos(t + i*2.1) * 26, cm.height/2 + Math.sin(t + i*2.1) * 26, 9, 0, 6.284);
        g.fillStyle = ['#e5645f','#e8c96a','#cf9b6a'][i]; g.fill();
      }
    });

    if (!cw.transferControlToOffscreen || !window.Worker){
      cw.parentElement.insertAdjacentHTML('beforeend',
        '<p style="position:absolute;inset:0;display:grid;place-items:center;font-size:10px;color:#85807a">sem OffscreenCanvas</p>');
      return;
    }
    var src = `
      let cv, c, t = 0;
      onmessage = e => {
        cv = e.data.canvas;
        c = cv.getContext('2d');
        const laco = () => {
          t += 0.04;
          c.fillStyle = '#100f0e';
          c.fillRect(0, 0, cv.width, cv.height);
          for (let i = 0; i < 3; i++){
            c.beginPath();
            c.arc(cv.width/2 + Math.cos(t + i*2.1) * 26,
                  cv.height/2 + Math.sin(t + i*2.1) * 26, 9, 0, 6.284);
            c.fillStyle = ['#d4af37','#b08ac9','#5cc88f'][i];
            c.fill();
          }
          requestAnimationFrame(laco);
        };
        laco();
      };`;
    var url = URL.createObjectURL(new Blob([src], { type:'text/javascript' }));
    var wk = new Worker(url);
    var off = cw.transferControlToOffscreen();
    wk.postMessage({ canvas: off }, [off]);
    ctx.clean(function(){ wk.terminate(); URL.revokeObjectURL(url); });

    ctx.on(root.querySelector('.ax11-b'),'click',function(){
      var fim = performance.now() + 1000;
      while (performance.now() < fim) { /* trava a main de propósito */ }
    });
  }
});

add({
  id:'ax12', cat:'avancado', title:'WebGPU',
  desc:'A API que sucede o WebGL: pipeline explícito e shaders em WGSL. Cai para um aviso onde não houver suporte.',
  tags:['WebGPU','WGSL','pipeline'], stage:'flush', hint:'Chrome/Edge 113+',
  html:`<div class="ax12"><canvas></canvas><p class="ax12-f">iniciando WebGPU…</p></div>`,
  css:`
    .ax12{position:relative;width:100%;height:100%;background:#070605}
    .ax12 canvas{width:100%;height:100%;display:block}
    .ax12-f{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:20px;
      font-family:var(--mono);font-size:11px;color:#85807a;margin:0}
    .ax12.ok .ax12-f{display:none}`,
  js:function(root,ctx){
    var box = root.querySelector('.ax12'), cv = root.querySelector('canvas'), fb = root.querySelector('.ax12-f');
    var dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr;
    if (!navigator.gpu){ fb.textContent = 'navigator.gpu indisponível — este navegador não expõe WebGPU'; return; }

    var vivo = true;
    ctx.clean(function(){ vivo = false; });

    navigator.gpu.requestAdapter().then(function(ad){
      if (!ad) throw new Error('sem adaptador');
      return ad.requestDevice();
    }).then(function(dev){
      if (!vivo) return;
      var gpu = cv.getContext('webgpu');
      var fmt = navigator.gpu.getPreferredCanvasFormat();
      gpu.configure({ device:dev, format:fmt, alphaMode:'premultiplied' });

      var shader = dev.createShaderModule({ code: `
        struct Saida { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
        @vertex fn vs(@builtin(vertex_index) i: u32) -> Saida {
          var p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
          var s: Saida;
          s.pos = vec4f(p[i], 0, 1);
          s.uv = p[i] * 0.5 + 0.5;
          return s;
        }
        @group(0) @binding(0) var<uniform> t: f32;
        @fragment fn fs(e: Saida) -> @location(0) vec4f {
          let uv = e.uv * 2.0 - 1.0;
          var cor = vec3f(0.03, 0.026, 0.022);
          for (var i = 0; i < 4; i++) {
            let f = f32(i);
            let c = vec2f(sin(t * (0.4 + f * 0.17) + f) * 0.6,
                          cos(t * (0.3 + f * 0.21) + f * 2.0) * 0.5);
            let d = length(uv - c);
            let brilho = 0.055 / (d + 0.02);
            cor += brilho * vec3f(0.92 - f * 0.05, 0.72 - f * 0.09, 0.32 + f * 0.22);
          }
          return vec4f(pow(cor, vec3f(0.85)), 1.0);
        }` });

      var pipe = dev.createRenderPipeline({
        layout:'auto',
        vertex:{ module:shader, entryPoint:'vs' },
        fragment:{ module:shader, entryPoint:'fs', targets:[{ format:fmt }] },
        primitive:{ topology:'triangle-list' }
      });
      var ub = dev.createBuffer({ size:16, usage:GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
      var grupo = dev.createBindGroup({ layout:pipe.getBindGroupLayout(0), entries:[{ binding:0, resource:{ buffer:ub } }] });

      box.classList.add('ok');
      var t = 0;
      ctx.loop(function(){
        t += .016;
        dev.queue.writeBuffer(ub, 0, new Float32Array([t]));
        var enc = dev.createCommandEncoder();
        var passe = enc.beginRenderPass({ colorAttachments:[{
          view: gpu.getCurrentTexture().createView(),
          loadOp:'clear', storeOp:'store', clearValue:{ r:.03, g:.026, b:.022, a:1 }
        }]});
        passe.setPipeline(pipe);
        passe.setBindGroup(0, grupo);
        passe.draw(3);
        passe.end();
        dev.queue.submit([enc.finish()]);
      });
    }).catch(function(e){
      fb.textContent = 'WebGPU não disponível: ' + e.message;
    });
  }
});

})();
