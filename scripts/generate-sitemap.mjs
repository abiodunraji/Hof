// Generates public/sitemap.xml from the same route table used for
// prerendering (src/seo/routes.json), so the sitemap always matches the
// canonical URLs actually baked into the built HTML.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const seoTablePath = path.join(root, 'src', 'seo', 'routes.json');
const outPath = path.join(root, 'public', 'sitemap.xml');

// Mirrors scripts/prerender.mjs's canonicalUrl(): '/' stays '/', every other
// route gets a trailing slash (GitHub Pages 301-redirects bare paths).
function canonicalUrl(siteOrigin, routePath) {
  if (routePath === '/') return `${siteOrigin}/`;
  return `${siteOrigin}${routePath}/`;
}

async function main() {
  const seoTable = JSON.parse(await readFile(seoTablePath, 'utf-8'));
  const { siteOrigin, routes } = seoTable;

  const urls = routes
    .map((r) => `  <url>\n    <loc>${canonicalUrl(siteOrigin, r.path)}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(outPath, xml, 'utf-8');
  console.log(`Wrote ${routes.length} URLs to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
