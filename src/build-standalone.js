import fs from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const html = fs.readFileSync(new URL('index.html', dist), 'utf8');
const css = fs.readFileSync(new URL('index.css', dist), 'utf8');
const js = fs.readFileSync(new URL('index.js', dist), 'utf8');
const script = /<script\b[^>]*\bsrc="\/?index\.js"[^>]*><\/script>/;
const stylesheet = /<link\b[^>]*\bhref="\/?index\.css"[^>]*>/;

if (!script.test(html) || !stylesheet.test(html)) {
  throw new Error('Expected Vite entry assets index.js and index.css were not found.');
}

// Function replacements preserve literal dollar signs in bundled code and CSS.
const standaloneHTML = html
  .replace(script, () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace(stylesheet, () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`)
  .replaceAll('href="/icons/', 'href="public/icons/')
  .replace('href="/manifest.webmanifest"', 'href="public/manifest.webmanifest"');

fs.writeFileSync(new URL('../index.html', import.meta.url), standaloneHTML);
console.log(`Standalone index.html: ${(Buffer.byteLength(standaloneHTML) / 1024).toFixed(2)} KiB`);
