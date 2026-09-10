import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { subAppCache } from "./subAppCache";

const container = document.getElementById("root")!;

// Matches scripts/prerender.mjs's renderUrl convention: '/' stays '/', every
// other route is rendered (and marked via <meta name="prerendered-route">)
// with a trailing slash.
function normalizePathname(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

// Loads the sub-app whose module the current route's prerendered markup was
// built from, and caches the already-resolved component in subAppCache so
// the first client render (App.tsx's InteriorsAppSwitch/ConstructionAppSwitch)
// reads it directly instead of suspending on React.lazy's own .then().
async function loadSubAppForPath(pathname: string): Promise<void> {
  if (pathname === "/interiors" || pathname.startsWith("/interiors/")) {
    const mod = await import("./InteriorsApp");
    subAppCache.InteriorsApp = mod.InteriorsApp;
  } else if (pathname === "/construction" || pathname.startsWith("/construction/")) {
    const mod = await import("./ConstructionApp");
    subAppCache.ConstructionApp = mod.ConstructionApp;
  }
  // '/' has no sub-app to load.
}

async function bootstrap() {
  const pathname = normalizePathname(window.location.pathname);
  const marker = document.querySelector('meta[name="prerendered-route"]');
  const prerenderedRoute = marker ? marker.getAttribute("content") : null;
  const hasElementChildren = container.children.length > 0;

  // Reuse the prerendered DOM only when #root actually has prerendered
  // markup in it AND it was prerendered for the exact path we're on now.
  // The marker can mismatch (or be absent) when: this is build/404.html
  // (empty #root, no marker), or index.html's ?p= redirect handler above
  // rewrote location.pathname away from the path this HTML was served for.
  // In both cases we must throw away whatever is in #root and render fresh.
  if (hasElementChildren && prerenderedRoute === pathname) {
    await loadSubAppForPath(pathname);
    hydrateRoot(container, <App />);
  } else {
    container.innerHTML = "";
    createRoot(container).render(<App />);
  }
}

bootstrap();
