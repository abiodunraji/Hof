import { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ConstructionNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToMain: () => void;
}

export function ConstructionNavigation({ currentPage, onNavigate, onNavigateToMain }: ConstructionNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMainNavigation = () => {
    onNavigateToMain();
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-wood-light/95 to-white/95 backdrop-blur-md border-b border-wood-primary/20 shadow-lg relative wood-texture">
      <div className="absolute inset-0 bg-gradient-to-r from-wood-primary/5 via-transparent to-wood-primary/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={handleMainNavigation}
              className="text-muted-foreground hover:text-foreground transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">HOF Group</span>
            </button>
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => handleNavigation('home')}
            >
              <h1 className="text-2xl text-wood-dark tracking-wide">HOF Construction</h1>
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
                    ? 'text-wood-dark font-medium'
                    : 'text-wood-primary hover:text-wood-dark'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => handleNavigation('contact')}
              className="bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-primary/90 hover:to-wood-dark/90 text-white shadow-lg"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-wood-dark hover:text-wood-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-wood-primary/20 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={handleMainNavigation}
              className="block w-full text-left px-4 py-2 rounded transition text-wood-primary hover:bg-wood-light/30 hover:text-wood-dark flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to HOF Group
            </button>
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  currentPage === link.page
                    ? 'bg-wood-light/50 text-wood-dark font-medium'
                    : 'text-wood-primary hover:bg-wood-light/30 hover:text-wood-dark'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavigation('contact')}
              className="w-full mt-2 bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-primary/90 hover:to-wood-dark/90 text-white"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
