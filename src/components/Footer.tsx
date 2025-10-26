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
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl mb-4 text-primary">House of Faridah</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Creating beautiful, timeless spaces that nurture the soul and celebrate the art of living.
              Every design tells a unique story of elegance and comfort.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => handleNavigation('home')} className="hover:text-primary transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className="hover:text-primary transition">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('portfolio')} className="hover:text-primary transition">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('services')} className="hover:text-primary transition">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className="hover:text-primary transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Follow for design inspiration<br />and project updates
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} House of Faridah. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Designed with <Heart size={16} className="text-primary" /> by Faridah
          </p>
        </div>
      </div>
    </footer>
  );
}
