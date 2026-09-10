import { Suspense, type ComponentType } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Toaster } from './components/ui/sonner';

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export interface AppRoutesProps {
  InteriorsApp: ComponentType;
  ConstructionApp: ComponentType;
}

/**
 * The public route tree shared by the client (src/App.tsx, inside
 * BrowserRouter) and the server (src/entry-server.tsx, inside StaticRouter).
 * Keeping this in one module guarantees the server's HTML and the browser's
 * first render produce the exact same element tree for '/', '/interiors/*'
 * and '/construction/*'.
 *
 * InteriorsApp/ConstructionApp are passed in as props so the client can use
 * lazy() (for code-splitting) while the server uses direct imports (so
 * AdminApp is never pulled into the SSR bundle) — the element structure
 * rendered is identical either way.
 */
export function AppRoutes({ InteriorsApp, ConstructionApp }: AppRoutesProps) {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/interiors/*" element={<InteriorsApp />} />
          <Route path="/construction/*" element={<ConstructionApp />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}
