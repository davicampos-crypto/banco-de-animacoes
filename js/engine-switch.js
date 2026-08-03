/* ============================================================
   ENGINE SWITCH — seletor de tecnologia de animação
   Injeta um <select> na toolbar que navega entre as páginas
   equivalentes do banco, cada uma implementada com outra lib.
   A página atual é declarada em <body data-engine="...">.
   ============================================================ */
(function () {
  'use strict';

  var ENGINES = [
    { id: 'index',   nome: 'Vanilla · site completo (213)', href: 'index.html' },
    { id: 'vanilla', nome: 'Vanilla JS · suíte (104)',      href: 'vanilla.html' },
    { id: 'gsap',    nome: 'GSAP · suíte (104)',            href: 'gsap.html' },
    { id: 'anime',   nome: 'Anime.js · suíte (104)',        href: 'anime.html' },
    { id: 'waapi',   nome: 'Web Animations API · suíte (104)', href: 'waapi.html' },
    { id: 'react',   nome: 'React 18 · suíte (104)',           href: 'react.html' },
    { id: 'vue',     nome: 'Vue 3 · suíte (104)',              href: 'vue.html' },
    { id: 'svelte',  nome: 'Svelte · suíte (104)',             href: 'svelte.html' },
    { id: 'tailwind', nome: 'Tailwind CSS · suíte (104)',      href: 'tailwind.html' }
  ];

  var atual = document.body.getAttribute('data-engine') || 'index';

  function montar() {
    var tools = document.querySelector('.toolbar .tools');
    if (!tools) return;

    var box = document.createElement('label');
    box.className = 'engine-pick';
    box.title = 'Trocar a tecnologia que executa as animações';

    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Tecnologia das animações');
    ENGINES.forEach(function (e) {
      var o = document.createElement('option');
      o.value = e.href;
      o.textContent = e.nome;
      if (e.id === atual) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { location.href = sel.value; });

    var ico = document.createElement('span');
    ico.className = 'engine-pick__ico';
    ico.textContent = '⚙';

    box.appendChild(ico);
    box.appendChild(sel);
    tools.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();
