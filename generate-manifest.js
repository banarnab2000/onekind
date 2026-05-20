/**
 * generate-manifest.js
 * 
 * Scans asset directories and writes public/assets-manifest.json
 * Run automatically via `prestart` and `prebuild` npm scripts.
 * Add/remove images freely — the Angular app will auto-populate.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

function scanFolder(folderPath, urlPrefix) {
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath)
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map(f => `${urlPrefix}/${f}`);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  upcoming:       scanFolder(path.join(ASSETS_DIR, 'upcoming'),        'assets/upcoming'),
  projects:       scanFolder(path.join(ASSETS_DIR, 'projects'),        'assets/projects'),
  collabs_artists: scanFolder(path.join(ASSETS_DIR, 'collabs_artists'), 'assets/collabs_artists'),
  collabs_brands:  scanFolder(path.join(ASSETS_DIR, 'collabs_brands'),  'assets/collabs_brands'),
};

const outPath = path.join(PUBLIC_DIR, 'assets-manifest.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log('✅ assets-manifest.json generated:');
console.log(`   upcoming:        ${manifest.upcoming.length} images`);
console.log(`   projects:        ${manifest.projects.length} images`);
console.log(`   collabs_artists: ${manifest.collabs_artists.length} images`);
console.log(`   collabs_brands:  ${manifest.collabs_brands.length} images`);
