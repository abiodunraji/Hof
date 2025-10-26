import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { InteriorsApp } from './InteriorsApp';
import { ConstructionApp } from './ConstructionApp';
import { Toaster } from './components/ui/sonner';

type AppRoute = '/' | '/interiors' | '/construction';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');

  const handleNavigate = (path: string) => {
    setCurrentRoute(path as AppRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case '/':
        return <LandingPage onNavigate={handleNavigate} />;
      case '/interiors':
        return <InteriorsApp onNavigateToMain={() => handleNavigate('/')} />;
      case '/construction':
        return <ConstructionApp onNavigateToMain={() => handleNavigate('/')} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {renderRoute()}
      <Toaster />
    </>
  );
}
