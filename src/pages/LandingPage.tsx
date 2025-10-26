import { ArrowRight, Home, Building2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1615532316696-3116b1df3ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjEzNjI2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/50" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
            Welcome to HOF Group
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Transforming Spaces, Building Dreams
          </p>
        </div>
      </section>

      {/* Service Panels Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            
            {/* HOF Interiors Panel */}
            <button
              onClick={() => onNavigate('/interiors')}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 border border-primary/20 hover:border-primary/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/30 group-hover:from-primary/10 group-hover:via-primary/15 group-hover:to-accent/40 transition-all duration-500" />
              
              <div className="relative p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                {/* Icon */}
                <div className="mb-6 md:mb-8 p-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Home className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-primary">
                  HOF Interiors
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Elegant interior design services with a feminine touch. Creating beautiful, personalized spaces that reflect your unique style.
                </p>
                
                {/* Navigation Links Preview */}
                <div className="flex flex-wrap gap-3 justify-center mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">About</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">Portfolio</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">Services</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">Contact</span>
                </div>
                
                {/* CTA Arrow */}
                <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all duration-300">
                  <span>Explore Interiors</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* HOF Construction Panel */}
            <button
              onClick={() => onNavigate('/construction')}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 border border-foreground/20 hover:border-foreground/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-foreground/10 to-muted-foreground/20 group-hover:from-foreground/10 group-hover:via-foreground/15 group-hover:to-muted-foreground/30 transition-all duration-500" />
              
              <div className="relative p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                {/* Icon */}
                <div className="mb-6 md:mb-8 p-6 rounded-full bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300">
                  <Building2 className="w-12 h-12 md:w-16 md:h-16 text-foreground" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
                  HOF Construction
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Professional construction and renovation services. Building quality structures with precision, reliability, and excellence.
                </p>
                
                {/* Navigation Links Preview */}
                <div className="flex flex-wrap gap-3 justify-center mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm px-3 py-1 rounded-full bg-foreground/10 text-foreground">About</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-foreground/10 text-foreground">Projects</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-foreground/10 text-foreground">Services</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-foreground/10 text-foreground">Contact</span>
                </div>
                
                {/* CTA Arrow */}
                <div className="flex items-center gap-2 text-foreground group-hover:gap-4 transition-all duration-300">
                  <span>Explore Construction</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 HOF Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
