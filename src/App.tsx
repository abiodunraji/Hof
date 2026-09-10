import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { AppRoutes } from './AppRoutes';
import { subAppCache } from './subAppCache';

// Lazy load sub-applications for better performance
const InteriorsAppLazy = lazy(() => import('./InteriorsApp').then(module => ({ default: module.InteriorsApp })));
const ConstructionAppLazy = lazy(() => import('./ConstructionApp').then(module => ({ default: module.ConstructionApp })));
const AdminApp = lazy(() => import('./AdminApp').then(module => ({ default: module.AdminApp })));

// On the very first client render, main.tsx may have already awaited this
// sub-app's dynamic import and cached the resolved component in
// subAppCache (see that file for why React.lazy alone can't do this
// synchronously). Prefer the cached component so hydration matches the
// prerendered markup with no Suspense fallback; any later render (or a
// first render where nothing was cached) falls back to the lazy component.
function InteriorsApp() {
  const Cached = subAppCache.InteriorsApp;
  return Cached ? <Cached /> : <InteriorsAppLazy />;
}
function ConstructionApp() {
  const Cached = subAppCache.ConstructionApp;
  return Cached ? <Cached /> : <ConstructionAppLazy />;
}

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <AppRoutes InteriorsApp={InteriorsApp} ConstructionApp={ConstructionApp} />
      <Routes>
        <Route path="/.admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}
