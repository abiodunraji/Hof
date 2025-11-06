import { Routes, Route } from 'react-router-dom';
import { ConstructionNavigation } from './components/ConstructionNavigation';
import { ConstructionFooter } from './components/ConstructionFooter';
import { ConstructionHomePage } from './pages/construction/ConstructionHomePage';
import { ConstructionAboutPage } from './pages/construction/ConstructionAboutPage';
import { ConstructionPortfolioPage } from './pages/construction/ConstructionPortfolioPage';
import { ConstructionContactPage } from './pages/construction/ConstructionContactPage';
import { Toaster } from './components/ui/sonner';

export function ConstructionApp() {
  return (
    <div className="min-h-screen bg-background">
      <ConstructionNavigation />
      <main>
        <Routes>
          <Route path="/" element={<ConstructionHomePage />} />
          <Route path="/about" element={<ConstructionAboutPage />} />
          <Route path="/portfolio" element={<ConstructionPortfolioPage />} />
          <Route path="/contact" element={<ConstructionContactPage />} />
        </Routes>
      </main>
      <ConstructionFooter />
      <Toaster position="top-right" />
    </div>
  );
}
