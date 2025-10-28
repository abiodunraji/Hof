import { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToMain?: () => void;
}

export function Navigation({ currentPage, onNavigate, onNavigateToMain }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMainNavigation = () => {
    if (onNavigateToMain) {
      onNavigateToMain();
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Services', page: 'services' },
    { label: 'Process', page: 'process' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-primary/20 shadow-lg relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-light/20 via-transparent to-gold-light/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {onNavigateToMain && (
              <button
                onClick={handleMainNavigation}
                className="text-muted-foreground hover:text-primary transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">HOF Group</span>
              </button>
            )}
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => handleNavigation('home')}
            >
              <h1 className="text-2xl gold-gradient-text tracking-wide">House of Faridah</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className={`transition ${
                  currentPage === link.page
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => handleNavigation('contact')}
              className="bg-primary hover:bg-primary/90"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-primary/10 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {onNavigateToMain && (
              <button
                onClick={handleMainNavigation}
                className="block w-full text-left px-4 py-2 rounded transition text-muted-foreground hover:bg-primary/5 hover:text-primary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to HOF Group
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  currentPage === link.page
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavigation('contact')}
              className="w-full mt-2 bg-primary hover:bg-primary/90"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
