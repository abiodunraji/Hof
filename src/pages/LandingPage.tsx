import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { interiorsProjects, constructionProjects } from '../data/portfolioData';

// Generate image arrays from portfolio data
const interiorsImages = interiorsProjects.flatMap(project => [
  project.image,
  ...(project.gallery || [])
]);

const constructionImages = constructionProjects.flatMap(project => [
  project.image,
  ...(project.gallery || [])
]);

export function LandingPage() {
  const [interiorsIndex, setInteriorsIndex] = useState(0);
  const [constructionIndex, setConstructionIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interiorsInterval = setInterval(() => {
      setInteriorsIndex((prev) => (prev + 1) % interiorsImages.length);
    }, 4000);

    const constructionInterval = setInterval(() => {
      setConstructionIndex((prev) => (prev + 1) % constructionImages.length);
    }, 4500);

    return () => {
      clearInterval(interiorsInterval);
      clearInterval(constructionInterval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Split-Screen Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="h-full flex flex-col md:flex-row">
          
          {/* LEFT: HOF Interiors */}
          <Link
            to="/interiors"
            className="group relative flex-1 overflow-hidden hover:flex-[1.15] transition-all duration-700 ease-out"
          >
            {/* Image carousel */}
            {interiorsImages.map((image, idx) => (
              <ImageWithFallback
                key={image}
                src={image}
                alt="HOF Interiors Portfolio"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === interiorsIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Hover overlay (left only) */}
            <div className="landing-panel-overlay landing-overlay-interiors" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 p-6 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-hot-pink/40 transition-all duration-300 shadow-2xl group-hover:scale-110">
                <img
                  src="/assets/hof-interiors-logo.png"
                  alt="House of Faridah Interiors logo"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_80%)]">
                HOF Interiors
              </h2>
              
              <p className="text-white text-lg md:text-xl max-w-md mb-6 drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                Where elegance meets functionality
              </p>
              
              <div className="flex items-center gap-3 text-white group-hover:gap-5 transition-all duration-300 [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                <span className="text-luxury-spacing">Explore</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {interiorsImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === interiorsIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Link>

          {/* Desktop center gutter (creates real separation between panels) */}
          <div className="hidden md:flex w-12 relative items-center justify-center bg-background border-l border-r border-white/20">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-lg" />
            <div className="relative z-10 p-4 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 shadow-2xl">
              <div className="font-display text-xl tracking-wider text-primary [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
                HOF
              </div>
            </div>
          </div>
          
          {/* Scroll indicator at bottom center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white animate-fade-in-up animate-delay-1000">
            <span className="text-sm text-primary text-luxury-spacing [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">Choose Your Vision</span>
            <ChevronDown className="w-5 h-5 text-primary animate-bounce drop-shadow-lg" />
          </div>

          {/* Mobile horizontal divider */}
          <div className="md:hidden relative z-20 py-4 bg-gradient-to-r from-primary/50 via-background to-wood-primary/50 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="font-display text-xl tracking-wider text-white">HOF</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* RIGHT: HOF Construction */}
          <Link
            to="/construction"
            className="group relative flex-1 overflow-hidden hover:flex-[1.15] transition-all duration-700 ease-out"
          >
            {/* Image carousel */}
            {constructionImages.map((image, idx) => (
              <ImageWithFallback
                key={image}
                src={image}
                alt="HOF Construction Portfolio"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === constructionIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Hover overlay (right only) */}
            <div className="landing-panel-overlay landing-overlay-construction" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 p-6 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-wood-light/40 transition-all duration-300 shadow-2xl group-hover:scale-110">
                <img
                  src="/assets/hof-construction-logo.png"
                  alt="House of Faridah Construction logo"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_80%)]">
                HOF Construction
              </h2>
              
              <p className="text-white text-lg md:text-xl max-w-md mb-6 drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                Building Your Vision Into Reality
              </p>
              
              <div className="flex items-center gap-3 text-white group-hover:gap-5 transition-all duration-300 [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                <span className="text-luxury-spacing">Explore</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {constructionImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === constructionIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 House of Faridah. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
