const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1x1 PNG (dark background) base64
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Yq7tP8AAAAASUVORK5CYII=';

const files = [
  { name: 'dartboard-192.png', size: 192 },
  { name: 'dartboard-512.png', size: 512 }
];

files.forEach(f => {
  const out = path.join(outDir, f.name);
  fs.writeFileSync(out, Buffer.from(pngBase64, 'base64'));
  console.log('Wrote', out);
});
