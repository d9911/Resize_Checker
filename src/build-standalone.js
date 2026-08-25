/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем файлы
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../dist/index.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '../dist/index.js'), 'utf8');

// Создаем standalone HTML
const standaloneHTML = html
  .replace('</head>', `<style>${css}</style></head>`)
  .replace(/<script\s+type="module"\s+src="(?:\/src\/)?main\.ts"><\/script>/, `<script>${js}</script>`)
  .replaceAll('href="/icons/', 'href="public/icons/')
  .replace('href="/manifest.webmanifest"', 'href="public/manifest.webmanifest"');

// Сохраняем результат
fs.writeFileSync(path.join(__dirname, '../index.html'), standaloneHTML);

console.log('✅ Standalone HTML файл создан: index.html');
console.log(`📦 Размер: ${(standaloneHTML.length / 1024).toFixed(2)} KB`);
