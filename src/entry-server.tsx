import { StaticRouter } from 'react-router';
import { InteriorsApp } from './InteriorsApp';
import { ConstructionApp } from './ConstructionApp';
import { AppRoutes } from './AppRoutes';

/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Imports the real page trees directly (never through lazy()/App.tsx),
 * so AdminApp is never pulled in and the rendered output is the actual
 * page markup rather than the Suspense "Loading..." fallback.
 *
 * Renders the same shared <AppRoutes> tree as src/App.tsx (same Suspense
 * wrapper, same <Routes>, same <Toaster/>) so the server's HTML matches the
 * browser's first client render exactly. The /.admin/* route declared in
 * App.tsx is intentionally omitted here — AdminApp is never imported by
 * this file.
 *
 * Runtime (browser) behaviour is untouched: src/main.tsx still boots
 * src/App.tsx with createRoot, exactly as before.
 */
export function render(url: string) {
  return (
    <StaticRouter location={url}>
      <AppRoutes InteriorsApp={InteriorsApp} ConstructionApp={ConstructionApp} />
    </StaticRouter>
  );
}
