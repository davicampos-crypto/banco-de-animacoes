import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

await esbuild.build({
  entryPoints: ['main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: '../js/apps/svelte-app.js',
  plugins: [sveltePlugin()],
  logLevel: 'info'
});
