import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Toaster } from './components/ui/sonner';

// Lazy load sub-applications for better performance
const InteriorsApp = lazy(() => import('./InteriorsApp').then(module => ({ default: module.InteriorsApp })));
const ConstructionApp = lazy(() => import('./ConstructionApp').then(module => ({ default: module.ConstructionApp })));

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return null;
}

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

export default function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/interiors/*" element={<InteriorsApp />} />
          <Route path="/construction/*" element={<ConstructionApp />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}
