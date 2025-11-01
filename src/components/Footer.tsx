import { Instagram, Facebook, Linkedin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-foreground to-gray-900 text-white py-12 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--gold-dark)_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--gold)_0%,transparent_50%)] opacity-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl mb-4 gold-gradient-text">House of Faridah</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Creating beautiful, timeless spaces that nurture the soul and celebrate the art of living.
              Every design tells a unique story of elegance and comfort.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent" />
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => handleNavigation('home')} className="text-gray-300 hover:text-gold hover:text-primary transition-colors duration-300">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className="text-gray-300 hover:text-gold hover:text-primary transition-colors duration-300">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('portfolio')} className="text-gray-300 hover:text-gold hover:text-primary transition-colors duration-300">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('services')} className="text-gray-300 hover:text-gold hover:text-primary transition-colors duration-300">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className="text-gray-300 hover:text-gold hover:text-primary transition-colors duration-300">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold hover:to-gold-dark transition-all duration-300 border border-gold/20">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold hover:to-gold-dark transition-all duration-300 border border-gold/20">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold hover:to-gold-dark transition-all duration-300 border border-gold/20">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Follow for design inspiration<br />and project updates
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} House of Faridah. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Designed with <Heart size={16} className="text-gold" fill="currentColor" /> by Faridah
          </p>
        </div>
      </div>
    </footer>
  );
}
