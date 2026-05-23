/**
 * setup-show-assets.js
 * Copies show photos/videos into public/assets/shows/[slug]/
 * and renames them to clean sequential names (photo-01.jpg, video-01.mp4)
 */

const fs = require('fs');
const path = require('path');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.MP4', '.MOV']);

const shows = [
  {
    slug: 'nebulakal',
    src: 'Journey to Nebulakal - Pradeep Kumar Live - Kochi Debut show_',
    photoDir: 'Photos',
    videoDir: 'video'
  },
  {
    slug: 'benny-dayal',
    src: 'Live in concert with Benny Dayal - Comeback show',
    photoDir: 'Photos',
    videoDir: 'Video'
  },
  {
    slug: 'jonita-gandhi',
    src: 'Immerse with Jonita Gandhi - Debut Show',
    photoDir: 'Photos',
    videoDir: 'Video'
  },
  {
    slug: 'pradeep-kumar',
    src: 'Immerse with Pradeep Kumar - Debut Show_',
    photoDir: 'Photos',
    videoDir: 'Video'
  }
];

const TARGET_BASE = 'public/assets/shows';

shows.forEach(show => {
  const targetDir = path.join(TARGET_BASE, show.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`\n📁 Processing: ${show.slug}`);

  // Copy & rename photos
  const photosDir = path.join(show.src, show.photoDir);
  if (fs.existsSync(photosDir)) {
    const files = fs.readdirSync(photosDir)
      .filter(f => IMAGE_EXTS.has(path.extname(f)))
      .sort();
    files.forEach((file, i) => {
      const newName = `photo-${String(i + 1).padStart(2, '0')}.jpg`;
      fs.copyFileSync(path.join(photosDir, file), path.join(targetDir, newName));
      console.log(`  📷 ${newName}  ←  ${file.substring(0, 60)}...`);
    });
    console.log(`  → ${files.length} photos copied`);
  }

  // Copy & rename videos
  const videosDir = path.join(show.src, show.videoDir);
  if (fs.existsSync(videosDir)) {
    const files = fs.readdirSync(videosDir)
      .filter(f => VIDEO_EXTS.has(path.extname(f)))
      .sort();
    files.forEach((file, i) => {
      const newName = `video-${String(i + 1).padStart(2, '0')}.mp4`;
      fs.copyFileSync(path.join(videosDir, file), path.join(targetDir, newName));
      console.log(`  🎬 ${newName}  ←  ${file.substring(0, 60)}...`);
    });
    console.log(`  → ${files.length} videos copied`);
  }
});

console.log('\n✅ All show assets copied and renamed!');
