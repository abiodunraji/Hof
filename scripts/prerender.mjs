// Prerenders the 11 public routes to static HTML at build time.
//
// Reads the client build's build/index.html as a template (produced by
// `vite build`), renders each public route with react-dom/server using the
// SSR bundle at build-ssr/entry-server.mjs (produced by
// `vite build --ssr src/entry-server.tsx --outDir build-ssr`), and injects
// the resulting markup into the template's empty <div id="root"></div>.
//
// Intentionally excludes /.admin entirely: entry-server.tsx never imports
// AdminApp, and no route below points at it.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const ssrEntry = path.join(root, 'build-ssr', 'entry-server.mjs');
const seoTablePath = path.join(root, 'src', 'seo', 'routes.json');

// route -> output file (relative to build/)
const ROUTES = [
  ['/', 'index.html'],
  ['/interiors', 'interiors/index.html'],
  ['/interiors/about', 'interiors/about/index.html'],
  ['/interiors/portfolio', 'interiors/portfolio/index.html'],
  ['/interiors/services', 'interiors/services/index.html'],
  ['/interiors/process', 'interiors/process/index.html'],
  ['/interiors/contact', 'interiors/contact/index.html'],
  ['/construction', 'construction/index.html'],
  ['/construction/about', 'construction/about/index.html'],
  ['/construction/portfolio', 'construction/portfolio/index.html'],
  ['/construction/contact', 'construction/contact/index.html'],
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// GitHub Pages 301-redirects a directory path without a trailing slash, so
// every canonical/og:url uses '/' for the root and a trailing slash for
// every other route (e.g. https://houseoffaridah.com/interiors/about/).
function canonicalUrl(siteOrigin, routePath) {
  if (routePath === '/') return `${siteOrigin}/`;
  return `${siteOrigin}${routePath}/`;
}

function buildHeadTags({ siteOrigin, siteName, meta, prerenderedRoute }) {
  const url = canonicalUrl(siteOrigin, meta.path);
  const imageUrl = `${siteOrigin}${meta.image}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const escapedUrl = escapeHtml(url);
  const escapedImageUrl = escapeHtml(imageUrl);
  const escapedSiteName = escapeHtml(siteName);

  return [
    // Read by src/main.tsx to decide whether #root's existing DOM was
    // prerendered for the exact path the browser is on (hydrateRoot) or
    // must be discarded and rendered fresh (createRoot) — see that file.
    // Does not touch <div id="root">.
    `<meta name="prerendered-route" content="${escapeHtml(prerenderedRoute)}">`,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${escapedUrl}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${escapedUrl}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escapedSiteName}">`,
    `<meta property="og:image" content="${escapedImageUrl}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${escapedImageUrl}">`,
  ].join('\n      ');
}

// Strips the template's generic <title> and <meta name="description"> so no
// duplicates are left behind, then injects the route-specific tags built
// above right before </head>.
function injectHead(html, headTagsBlock) {
  let out = html.replace(/<title>[\s\S]*?<\/title>\s*/, '');
  out = out.replace(/<meta\s+name="description"[^>]*>\s*/i, '');
  if (!/<\/head>/.test(out)) {
    throw new Error('Template is missing a </head> tag to inject SEO tags before.');
  }
  return out.replace('</head>', `      ${headTagsBlock}\n    </head>`);
}

async function main() {
  if (!existsSync(ssrEntry)) {
    throw new Error(`Missing SSR entry at ${ssrEntry}. Run the SSR build first.`);
  }
  const templatePath = path.join(buildDir, 'index.html');
  if (!existsSync(templatePath)) {
    throw new Error(`Missing client build template at ${templatePath}. Run the client build first.`);
  }

  const template = await readFile(templatePath, 'utf-8');
  const rootDivRe = /<div id="root"><\/div>/;
  if (!rootDivRe.test(template)) {
    throw new Error('Client build/index.html does not contain an empty <div id="root"></div> to inject into.');
  }

  if (!existsSync(seoTablePath)) {
    throw new Error(`Missing SEO route table at ${seoTablePath}.`);
  }
  const seoTable = JSON.parse(await readFile(seoTablePath, 'utf-8'));
  const { siteOrigin, siteName, routes: seoRoutes } = seoTable;
  const seoByPath = new Map(seoRoutes.map((r) => [r.path, r]));

  const { render } = await import(pathToFileUrl(ssrEntry));
  const { renderToString } = await import('react-dom/server');

  for (const [route, outRel] of ROUTES) {
    const meta = seoByPath.get(route);
    if (!meta) {
      throw new Error(`No SEO metadata entry for route "${route}" in ${seoTablePath}.`);
    }

    // Render at the same trailing-slash URL browsers and flash-check load
    // (see canonicalUrl above), so e.g. a nav's "current page" calculation
    // sees the same pathname on the server as it will on the client.
    const renderUrl = route === '/' ? '/' : `${route}/`;
    const markup = renderToString(render(renderUrl));
    if (!markup || markup.trim().length === 0) {
      throw new Error(`Prerender produced empty markup for route "${route}"`);
    }
    let html = template.replace(rootDivRe, `<div id="root">${markup}</div>`);
    html = injectHead(html, buildHeadTags({ siteOrigin, siteName, meta, prerenderedRoute: renderUrl }));
    const outPath = path.join(buildDir, outRel);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');
    console.log(`Prerendered ${route} -> build/${outRel} (${Buffer.byteLength(html, 'utf-8')} bytes)`);
  }
}

function pathToFileUrl(p) {
  return 'file://' + p.replace(/\\/g, '/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
