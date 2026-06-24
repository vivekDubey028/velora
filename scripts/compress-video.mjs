/**
 * Compresses loghero.mp4 using ffmpeg-static.
 * Target: H.264, CRF 28, 1280px wide, no audio, faststart.
 * Expected output: 4–8 MB from 68.7 MB source.
 */
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { stat, rename } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require    = createRequire(import.meta.url);
const ffmpegBin  = require('ffmpeg-static');

const __dirname  = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '..');
const INPUT      = join(ROOT, 'src/assets/videos/loghero.mp4');
const TMP        = join(ROOT, 'src/assets/videos/loghero_new.mp4');
const POSTER     = join(ROOT, 'src/assets/videos/loghero_poster.webp');

function run(bin, args) {
  return new Promise((resolve, reject) => {
    console.log(`\n  Running: ffmpeg ${args.join(' ')}\n`);
    const proc = spawn(bin, args, { stdio: ['ignore', 'inherit', 'inherit'] });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}`)));
    proc.on('error', reject);
  });
}

async function main() {
  if (!existsSync(INPUT)) {
    console.error(`❌ Input not found: ${INPUT}`);
    process.exit(1);
  }

  const origMB = ((await stat(INPUT)).size / 1024 / 1024).toFixed(1);
  console.log(`\n🎬  Compressing video (${origMB} MB)...\n`);

  // Step 1 — Extract poster frame at 0s
  console.log('  📸 Extracting poster frame...');
  await run(ffmpegBin, [
    '-ss', '0',
    '-i', INPUT,
    '-frames:v', '1',
    '-vf', 'scale=1280:-2',
    '-q:v', '2',
    '-y',
    POSTER,
  ]);
  const posterKB = ((await stat(POSTER)).size / 1024).toFixed(0);
  console.log(`  ✅ Poster: ${posterKB} KB → src/assets/videos/loghero_poster.webp`);

  // Step 2 — Compress video
  console.log('\n  🗜  Compressing MP4 (this takes a few minutes)...');
  await run(ffmpegBin, [
    '-i', INPUT,
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'slow',
    '-vf', 'scale=1280:-2',
    '-an',                    // no audio — it's an autoplay muted video
    '-movflags', '+faststart', // move moov atom to front for streaming
    '-y',
    TMP,
  ]);

  const newMB = ((await stat(TMP)).size / 1024 / 1024).toFixed(1);
  console.log(`\n  Compressed size: ${newMB} MB`);

  // Replace original
  await rename(TMP, INPUT);
  const saved = Math.round((1 - parseFloat(newMB) / parseFloat(origMB)) * 100);
  console.log(`  ✅ Saved: ${saved}%  (${origMB} MB → ${newMB} MB)\n`);

  console.log('✅ Video compression complete.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
