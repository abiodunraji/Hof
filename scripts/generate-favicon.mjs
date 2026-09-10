// Renders public/favicon.svg to 16/32/48px PNGs with sharp and packs them
// into a real multi-image .ico container (ICONDIR + ICONDIRENTRY headers
// wrapping embedded PNG frames, per the ICO spec) at public/favicon.ico.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const outPath = path.join(root, 'public', 'favicon.ico');

const SIZES = [16, 32, 48];

async function main() {
  const svg = await readFile(svgPath);
  const pngBuffers = await Promise.all(
    SIZES.map((size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer())
  );

  const numImages = pngBuffers.length;
  const headerSize = 6 + 16 * numImages;
  let offset = headerSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(numImages, 4); // number of images

  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const size = SIZES[i];
    const png = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count (0 = no palette / >=256 colors)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data from start of file
    dirEntries.push(entry);
    offset += png.length;
  }

  const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  await writeFile(outPath, ico);
  console.log(`Wrote ${numImages} frames (${SIZES.join(', ')}px) to ${outPath} (${ico.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
