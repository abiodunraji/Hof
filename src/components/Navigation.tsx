import { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname.split('/').pop() || 'home';
    return path === 'interiors' ? 'home' : path;
  };

  const currentPage = getCurrentPage();

  const handleBackClick = () => {
    // Check if there's history to go back to
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // Fallback to home if no history
      navigate('/');
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home', page: 'home', path: '/interiors' },
    { label: 'About', page: 'about', path: '/interiors/about' },
    { label: 'Portfolio', page: 'portfolio', path: '/interiors/portfolio' },
    { label: 'Services', page: 'services', path: '/interiors/services' },
    { label: 'Process', page: 'process', path: '/interiors/process' },
    { label: 'Contact', page: 'contact', path: '/interiors/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-primary/20 shadow-lg relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-light/20 via-transparent to-gold-light/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="text-muted-foreground hover:text-primary transition flex items-center gap-2"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <Link 
              to="/interiors"
              className="flex-shrink-0"
            >
              <h1 className="text-2xl gold-gradient-text tracking-wide">House of Faridah</h1>
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
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/interiors/contact">Get in Touch</Link>
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
            <button
              onClick={handleBackClick}
              className="block w-full text-left px-4 py-2 rounded transition text-muted-foreground hover:bg-primary/5 hover:text-primary flex items-center gap-2"
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-2 bg-primary hover:bg-primary/90"
            >
              <Link to="/interiors/contact" onClick={() => setIsOpen(false)}>Get in Touch</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
