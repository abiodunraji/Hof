import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

const MAX_DIMENSION = Number.parseInt(process.env.IMAGE_MAX_DIM ?? '2400', 10);

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  const kb = bytes / 1024;
  if (kb >= 1) return `${kb.toFixed(1)} KB`;
  return `${bytes} B`;
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    if (entry.isFile()) {
      yield fullPath;
    }
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) return null;

  const original = await fs.readFile(filePath);
  const originalSize = original.length;

  // Skip very small images (not worth touching)
  if (originalSize < 20 * 1024) return null;

  let pipeline = sharp(original, { failOn: 'none' });
  const metadata = await pipeline.metadata();

  // Avoid accidental animation loss
  if (metadata.pages && metadata.pages > 1) return null;

  // Optional resize: constrain the longest side to MAX_DIMENSION.
  // This is a large win for portfolio/hero images that are far larger than any realistic viewport.
  const shouldResize =
    Number.isFinite(MAX_DIMENSION) &&
    MAX_DIMENSION > 0 &&
    typeof metadata.width === 'number' &&
    typeof metadata.height === 'number' &&
    Math.max(metadata.width, metadata.height) > MAX_DIMENSION;

  if (shouldResize) {
    pipeline = pipeline.resize({
      width: metadata.width >= metadata.height ? MAX_DIMENSION : undefined,
      height: metadata.height > metadata.width ? MAX_DIMENSION : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  let output;

  if (ext === '.jpg' || ext === '.jpeg') {
    output = await pipeline
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();
  } else if (ext === '.webp') {
    output = await pipeline.webp({ quality: 80, effort: 4 }).toBuffer();
  } else if (ext === '.png') {
    // PNG strategy:
    // - For large PNGs, allow palette quantization (quality) to reduce size.
    // - For smaller PNGs, just crank compression.
    const isLarge = originalSize >= 512 * 1024;

    output = await pipeline
      .png(
        isLarge
          ? {
              compressionLevel: 9,
              adaptiveFiltering: true,
              palette: true,
              quality: 80,
              effort: 10,
            }
          : {
              compressionLevel: 9,
              adaptiveFiltering: true,
            },
      )
      .toBuffer();
  }

  if (!output) return null;

  const newSize = output.length;
  const savedBytes = originalSize - newSize;
  const savedPct = savedBytes / originalSize;

  // Only overwrite if we actually saved meaningfully
  if (savedBytes < 5 * 1024) return null;
  if (savedPct < 0.03) return null;

  await fs.writeFile(filePath, output);

  return {
    filePath,
    originalSize,
    newSize,
    savedBytes,
    resized: shouldResize,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  };
}

async function main() {
  const start = Date.now();

  let totalBefore = 0;
  let totalAfter = 0;
  let changedCount = 0;

  const changed = [];

  for await (const filePath of walk(PUBLIC_DIR)) {
    const ext = path.extname(filePath).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(ext)) continue;

    const statBefore = await fs.stat(filePath);
    totalBefore += statBefore.size;

    try {
      const result = await optimizeImage(filePath);
      const statAfter = await fs.stat(filePath);
      totalAfter += statAfter.size;

      if (result) {
        changedCount += 1;
        changed.push(result);
      }
    } catch (error) {
      // Keep going—some images may be malformed or unsupported.
      totalAfter += (await fs.stat(filePath)).size;
      console.warn(`Skipped (error): ${path.relative(PROJECT_ROOT, filePath)} -> ${error?.message ?? error}`);
    }
  }

  changed.sort((a, b) => b.savedBytes - a.savedBytes);

  console.log(`\nOptimized images in ${path.relative(PROJECT_ROOT, PUBLIC_DIR)}`);
  console.log(`Changed: ${changedCount}`);
  console.log(`Total before: ${formatBytes(totalBefore)}`);
  console.log(`Total after:  ${formatBytes(totalAfter)}`);
  console.log(`Saved:        ${formatBytes(totalBefore - totalAfter)} (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);

  if (changed.length) {
    console.log(`\nTop savings:`);
    for (const item of changed.slice(0, 12)) {
      console.log(
        `- ${path.relative(PROJECT_ROOT, item.filePath)}: ${formatBytes(item.originalSize)} -> ${formatBytes(item.newSize)} (saved ${formatBytes(item.savedBytes)})`,
      );
    }
  }

  console.log(`\nDone in ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

await main();
