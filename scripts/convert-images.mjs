import sharp from 'sharp';
import { readdir, unlink, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

const __dirname = pathDirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Directories to scan (relative to ROOT)
const SCAN_DIRS = [
  'src/assets',
  'src/assets/logistics',
  'src/assets/sustainability',
  'public/images',
  'public',
];

// Skip these subdirectory names entirely
const SKIP_DIRS = ['certifications', 'fonts', 'videos'];

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png'];
const MAX_DIM = 1920;
const WEBP_QUALITY = 84;

async function listImages(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const entries = await readdir(abs, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && IMAGE_EXTS.includes(extname(e.name).toLowerCase()))
    .map(e => join(abs, e.name));
}

async function convertFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXTS.includes(ext)) return;

  const normalised = filePath.replace(/\\/g, '/');
  if (SKIP_DIRS.some(skip => normalised.includes('/' + skip + '/'))) {
    console.log(`  SKIP: ${basename(filePath)}`);
    return;
  }

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    const origBytes = (await stat(filePath)).size;
    const meta = await sharp(filePath).metadata();

    let pipeline = sharp(filePath);

    if ((meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM) {
      pipeline = pipeline.resize(MAX_DIM, MAX_DIM, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

    const newBytes = (await stat(webpPath)).size;
    const saved = Math.round((1 - newBytes / origBytes) * 100);
    const origKB = (origBytes / 1024).toFixed(0);
    const newKB  = (newBytes  / 1024).toFixed(0);

    console.log(`  ✅ ${basename(filePath)}: ${origKB} KB → ${newKB} KB  (${saved}% saved)`);

    await unlink(filePath);

  } catch (err) {
    console.error(`  ❌ ${basename(filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log('\n🖼  Starting WebP conversion...\n');

  const seen = new Set();
  for (const dir of SCAN_DIRS) {
    const files = await listImages(dir);
    for (const f of files) {
      const key = f.replace(/\\/g, '/');
      if (!seen.has(key)) {
        seen.add(key);
        await convertFile(f);
      }
    }
  }

  console.log('\n✅ Image conversion complete.\n');
}

main().catch(console.error);
