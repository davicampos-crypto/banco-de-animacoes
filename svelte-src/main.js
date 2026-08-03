import App from './App.svelte';

const grid = document.getElementById('grid');
grid.innerHTML = '';
new App({ target: grid });
