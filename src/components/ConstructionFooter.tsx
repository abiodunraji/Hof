import { Building2, Mail, Phone, MapPin } from 'lucide-react';

interface ConstructionFooterProps {
  onNavigate: (page: string) => void;
}

export function ConstructionFooter({ onNavigate }: ConstructionFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-wood-dark via-wood-primary to-wood-dark text-background relative wood-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6" />
              <h3 className="text-xl">HOF Construction</h3>
            </div>
            <p className="text-background/70 text-sm">
              Building excellence since 2010. Quality construction and renovation services you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-background/70 hover:text-background transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-background/70 hover:text-background transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('portfolio')}
                  className="text-background/70 hover:text-background transition"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-background/70 hover:text-background transition"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Residential Construction</li>
              <li>Commercial Building</li>
              <li>Renovations & Additions</li>
              <li>Project Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-background/70">09039330335 / 07040654539</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-background/70">Houseoffaridahh@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-background/70">Bolien House, 90 4th Ave, Gwarinpa, Abuja 900108, Federal Capital Territory</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/70">
          <p>&copy; {currentYear} HOF Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
