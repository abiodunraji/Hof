import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { DesignProcessPage } from './pages/DesignProcessPage';
import { Toaster } from './components/ui/sonner';

interface InteriorsAppProps {
  onNavigateToMain: () => void;
}

export function InteriorsApp({ onNavigateToMain }: InteriorsAppProps) {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string, scrollToSection?: string) => {
    if (page === 'main') {
      onNavigateToMain();
    } else {
      setCurrentPage(page);
      // Scroll to top immediately on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // If a section is specified, scroll to it after a brief delay
      if (scrollToSection) {
        setTimeout(() => {
          const element = document.getElementById(scrollToSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'process':
        return <DesignProcessPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} onNavigateToMain={onNavigateToMain} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Toaster position="top-right" />
    </div>
  );
}
