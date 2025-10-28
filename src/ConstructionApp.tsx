import { useState } from 'react';
import { ConstructionNavigation } from './components/ConstructionNavigation';
import { ConstructionFooter } from './components/ConstructionFooter';
import { ConstructionHomePage } from './pages/construction/ConstructionHomePage';
import { ConstructionAboutPage } from './pages/construction/ConstructionAboutPage';
import { ConstructionPortfolioPage } from './pages/construction/ConstructionPortfolioPage';
import { ConstructionContactPage } from './pages/construction/ConstructionContactPage';
import { Toaster } from './components/ui/sonner';

interface ConstructionAppProps {
  onNavigateToMain: () => void;
}

export function ConstructionApp({ onNavigateToMain }: ConstructionAppProps) {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <ConstructionHomePage onNavigate={handleNavigate} />;
      case 'about':
        return <ConstructionAboutPage onNavigate={handleNavigate} />;
      case 'portfolio':
        return <ConstructionPortfolioPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ConstructionContactPage onNavigate={handleNavigate} />;
      default:
        return <ConstructionHomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ConstructionNavigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onNavigateToMain={onNavigateToMain} 
      />
      <main>
        {renderPage()}
      </main>
      <ConstructionFooter onNavigate={handleNavigate} />
      <Toaster position="top-right" />
    </div>
  );
}
