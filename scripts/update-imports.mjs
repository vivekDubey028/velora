/**
 * Updates all TypeScript/HTML source files to replace .jpg/.jpeg/.png
 * import paths with .webp — but SKIPS certifications/ (those stay PNG).
 */
import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function findFiles(dir, exts, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '.git', 'dist'].includes(e.name)) {
      await findFiles(full, exts, results);
    } else if (e.isFile() && exts.includes(extname(e.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

function replaceExtensions(content) {
  // 1. ES import/require paths: only replace local relative paths (starting with . or /)
  //    Do NOT replace https:// URLs (Unsplash etc.)
  //    Do NOT replace certifications/ paths (those PNGs were not converted)
  let out = content.replace(
    /(?<=from\s+['"])(?!https?:\/\/)(?!.*certifications\/)(\.\.?\/[^'"]*)\.(jpg|jpeg|png)(?=['"])/gi,
    '$1.webp'
  );

  // 2. /images/ public paths in HTML attributes and meta content=""
  out = out.replace(
    /(?<=['"\/])(\/images\/[^'"]+)\.(jpg|jpeg|png)(?=['"])/gi,
    '$1.webp'
  );

  return out;
}

async function processFile(filePath) {
  const original = await readFile(filePath, 'utf8');
  const updated = replaceExtensions(original);
  if (updated !== original) {
    await writeFile(filePath, updated, 'utf8');
    const rel = filePath.replace(ROOT, '').replace(/\\/g, '/');
    console.log(`  ✅ ${rel}`);
    return true;
  }
  return false;
}

async function main() {
  console.log('\n🔗 Updating import paths to .webp...\n');

  const srcDir  = join(ROOT, 'src');
  const htmlFile = join(ROOT, 'index.html');

  const files = await findFiles(srcDir, ['.tsx', '.ts', '.css']);
  if (existsSync(htmlFile)) files.push(htmlFile);

  let count = 0;
  for (const f of files) {
    if (await processFile(f)) count++;
  }

  console.log(`\n✅ Done — updated ${count} file(s).\n`);
}

main().catch(console.error);
