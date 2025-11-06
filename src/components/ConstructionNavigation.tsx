import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export function ConstructionNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = location.pathname.split('/').pop() || 'home';

  const navLinks = [
    { label: 'Home', page: 'home', path: '/construction' },
    { label: 'About Us', page: 'about', path: '/construction/about' },
    { label: 'Portfolio', page: 'portfolio', path: '/construction/portfolio' },
    { label: 'Contact Us', page: 'contact', path: '/construction/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-wood-light/95 to-white/95 backdrop-blur-md border-b border-wood-primary/20 shadow-lg relative wood-texture">
      <div className="absolute inset-0 bg-gradient-to-r from-wood-primary/5 via-transparent to-wood-primary/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="text-muted-foreground hover:text-foreground transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <Link to="/construction" className="flex-shrink-0">
              <h1 className="text-2xl text-wood-dark tracking-wide">HOF Construction</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={link.path}
                className={`transition ${
                  currentPage === link.page
                    ? 'text-wood-dark font-medium'
                    : 'text-wood-primary hover:text-wood-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              asChild
              className="bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-primary/90 hover:to-wood-dark/90 text-white shadow-lg"
            >
              <Link to="/construction/contact">Get a Quote</Link>
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
              onClick={handleBackClick}
              className="block w-full text-left px-4 py-2 rounded transition text-wood-primary hover:bg-wood-light/30 hover:text-wood-dark flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  currentPage === link.page
                    ? 'bg-wood-light/50 text-wood-dark font-medium'
                    : 'text-wood-primary hover:bg-wood-light/30 hover:text-wood-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-2 bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-primary/90 hover:to-wood-dark/90 text-white"
            >
              <Link to="/construction/contact" onClick={() => setIsOpen(false)}>Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
