import { ArrowRight, Home, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function LandingPage() {
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
            <Link
              to="/interiors"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 border border-primary/30 hover:border-gold elegant-hover luxe-card block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/30 via-primary/10 to-gold/20 group-hover:from-gold-light/40 group-hover:via-primary/15 group-hover:to-gold/30 transition-all duration-500" />
              <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                {/* Icon */}
                <div className="mb-6 md:mb-8 p-6 rounded-full bg-gradient-to-br from-gold-light to-gold/20 group-hover:from-gold to-gold-dark/30 transition-all duration-300 shadow-lg">
                  <Home className="w-12 h-12 md:w-16 md:h-16 text-gold-dark" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 gold-gradient-text">
                  HOF Interiors
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Elegant interior design services with a feminine touch. Creating beautiful, personalized spaces that reflect your unique style.
                </p>
                
                {/* Navigation Links Preview */}
                <div className="flex flex-wrap gap-3 justify-center mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm px-3 py-1 rounded-full bg-gold-light/50 backdrop-blur-sm border border-gold/30 text-gold-dark">About</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-gold-light/50 backdrop-blur-sm border border-gold/30 text-gold-dark">Portfolio</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-gold-light/50 backdrop-blur-sm border border-gold/30 text-gold-dark">Services</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-gold-light/50 backdrop-blur-sm border border-gold/30 text-gold-dark">Contact</span>
                </div>
                
                {/* CTA Arrow */}
                <div className="flex items-center gap-2 text-gold-dark group-hover:gap-4 transition-all duration-300">
                  <span className="tracking-wide">Explore Interiors</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* HOF Construction Panel */}
            <Link
              to="/construction"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 border border-wood-primary/30 hover:border-wood-primary elegant-hover block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wood-light/30 via-wood-secondary/10 to-wood-primary/20 group-hover:from-wood-light/40 group-hover:via-wood-secondary/15 group-hover:to-wood-primary/30 transition-all duration-500" />
              
              <div className="relative p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                {/* Icon */}
                <div className="mb-6 md:mb-8 p-6 rounded-full bg-gradient-to-br from-wood-light to-wood-secondary/30 group-hover:from-wood-secondary group-hover:to-wood-primary/30 transition-all duration-300 shadow-lg">
                  <Building2 className="w-12 h-12 md:w-16 md:h-16 text-wood-dark" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-wood-dark">
                  HOF Construction
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Professional construction and renovation services. Building quality structures with precision, reliability, and excellence.
                </p>
                
                {/* Navigation Links Preview */}
                <div className="flex flex-wrap gap-3 justify-center mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm px-3 py-1 rounded-full bg-wood-light/50 backdrop-blur-sm border border-wood-primary/30 text-wood-dark">About</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-wood-light/50 backdrop-blur-sm border border-wood-primary/30 text-wood-dark">Projects</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-wood-light/50 backdrop-blur-sm border border-wood-primary/30 text-wood-dark">Services</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-wood-light/50 backdrop-blur-sm border border-wood-primary/30 text-wood-dark">Contact</span>
                </div>
                
                {/* CTA Arrow */}
                <div className="flex items-center gap-2 text-wood-dark group-hover:gap-4 transition-all duration-300">
                  <span className="tracking-wide">Explore Construction</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

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
