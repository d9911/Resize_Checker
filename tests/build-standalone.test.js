import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

function fixture(t, html) {
  const root = mkdtempSync(join(tmpdir(), 'resize-checker-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'src'));
  mkdirSync(join(root, 'dist'));
  writeFileSync(join(root, 'package.json'), '{"type":"module"}');
  copyFileSync(new URL('../src/build-standalone.js', import.meta.url), join(root, 'src/build-standalone.js'));
  writeFileSync(join(root, 'dist/index.html'), html);
  writeFileSync(join(root, 'dist/index.js'), 'console.log("$& $$ </script>");');
  writeFileSync(join(root, 'dist/index.css'), 'body::after{content:"$& $$"}');
  return root;
}

test('standalone embeds built assets without corrupting dollar signs or script text', t => {
  const root = fixture(t, '<head><script type="module" crossorigin src="/index.js"></script><link rel="stylesheet" href="/index.css"><link rel="icon" href="/icons/favicon.svg"><link rel="manifest" href="/manifest.webmanifest"></head><body></body>');
  execFileSync(process.execPath, [join(root, 'src/build-standalone.js')]);
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  assert.ok(html.includes('console.log("$& $$ <\\/script>");'));
  assert.ok(html.includes('<style>body::after{content:"$& $$"}</style>'));
  assert.ok(html.includes('href="public/icons/favicon.svg"'));
  assert.ok(html.includes('href="public/manifest.webmanifest"'));
  assert.doesNotMatch(html, /src="\/?index\.js"|href="\/?index\.css"/);
});

test('standalone refuses incomplete build output instead of writing a broken page', t => {
  const root = fixture(t, '<head></head><body></body>');
  assert.throws(() => execFileSync(process.execPath, [join(root, 'src/build-standalone.js')], { stdio: 'pipe' }), /Expected Vite entry assets/);
});
