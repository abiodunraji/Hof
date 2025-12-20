import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Award, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { interiorsProjects, constructionProjects } from '../data/portfolioData';


export function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero carousel slides with sophisticated imagery
  const heroSlides = [
    {
      image: interiorsProjects[0]?.image || '/portfolio/interiors/contemporary-abuja-residence/living-room-view.jpg',
      overlayImage: interiorsProjects[1]?.image || '/portfolio/interiors/modern-kitchen-design/kitchen-full-view.jpg',
      title: 'OVER',
      titleLarge: '7 YEARS',
      titleBottom: 'OF DESIGN INNOVATION',
      description: 'Creating timeless spaces with elegance and sophistication',
    },
    {
      image: interiorsProjects[2]?.image || '/portfolio/interiors/executive-luxury-bathroom/luxury-bathroom-vanity-detail.jpg',
      overlayImage: interiorsProjects[3]?.image || '/portfolio/interiors/minimalist-bedroom-design/bedroom-full-view.jpg',
      title: 'RESIDENTIAL',
      titleLarge: '& COMMERCIAL',
      titleBottom: 'DESIGN EXCELLENCE',
      description: 'Transforming visions into extraordinary living environments',
    },
    {
      image: constructionProjects[0]?.image || interiorsProjects[0]?.image,
      overlayImage: interiorsProjects[4]?.image || interiorsProjects[1]?.image,
      title: 'CRAFTSMANSHIP',
      titleLarge: 'MEETS',
      titleBottom: 'INNOVATION',
      description: 'Where precision engineering meets artistic expression',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Premium Design */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={slide.image}
                alt="Interior design background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            </div>
          ))}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full min-h-screen flex items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8 sm:space-y-10">
              {/* Badge */}
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-white/90 text-sm sm:text-base lg:text-lg font-medium tracking-wider uppercase">Premium Design & Construction</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="animate-fade-in-up space-y-4" style={{animationDelay: '0.1s'}}>
                <h1 className="font-display text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[1.05] tracking-tight">
                  {heroSlides[currentSlide].title}
                  <span className="block mt-3 lg:mt-4 text-primary">{heroSlides[currentSlide].titleLarge}</span>
                  <span className="block mt-3 lg:mt-4 text-white/90">{heroSlides[currentSlide].titleBottom}</span>
                </h1>
              </div>

              {/* Description */}
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl font-light">
                  {heroSlides[currentSlide].description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up pt-4" style={{animationDelay: '0.3s'}}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 text-lg sm:text-xl md:text-2xl font-medium tracking-wide px-12 sm:px-16 lg:px-20 py-12 sm:py-20 h-auto rounded-xl shadow-lg hover:shadow-primary/50 min-w-[240px] sm:min-w-[280px]"
                >
                  <Link to="/interiors" className="flex items-center justify-center gap-4">
                    <span>Explore Interiors</span>
                    <ChevronRight className="w-6 h-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="text-white transition-all duration-300 text-lg sm:text-xl md:text-2xl font-medium tracking-wide px-12 sm:px-16 lg:px-20 py-12 sm:py-20 h-auto rounded-xl shadow-lg min-w-[240px] sm:min-w-[280px]"
                  style={{ backgroundColor: '#8b6f47' }}
                >
                  <Link 
                    to="/construction" 
                    className="flex items-center justify-center gap-4"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6b5636'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b6f47'}
                  >
                    <span>View Construction</span>
                    <Building2 className="w-6 h-6" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="hidden lg:block">
              <div className="relative animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                {/* Main image card */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                  <ImageWithFallback
                    src={heroSlides[currentSlide].overlayImage}
                    alt="Featured project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Stats card overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-display text-primary mb-1">7+</div>
                        <div className="text-xs uppercase tracking-wider text-neutral-600">Years</div>
                      </div>
                      <div className="text-center border-x border-neutral-200">
                        <div className="text-3xl font-display text-primary mb-1">500+</div>
                        <div className="text-xs uppercase tracking-wider text-neutral-600">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-display text-primary mb-1">300+</div>
                        <div className="text-xs uppercase tracking-wider text-neutral-600">Clients</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-center gap-6">
              {/* Nav buttons */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slide indicators */}
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Brand Logo */}
        <div className="absolute top-8 left-6 sm:left-8 lg:left-12 z-30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
              <span className="font-display text-2xl text-white">H</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-sm font-medium tracking-wider">HOUSE OF FARIDAH</p>
              <p className="text-white/60 text-xs tracking-wider">Design Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CREATIVITY SECTION - Large Text with Images */}
      <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Large Typography */}
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
              <div className="space-y-4">
                <h2 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] text-neutral-900">
                  CREATIVITY
                </h2>
                <h3 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-primary">
                  INSPIRING
                </h3>
                <h4 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-neutral-600">
                  IMAGINATION
                </h4>
              </div>
              
              <div className="h-px bg-gradient-to-r from-neutral-200 via-primary/20 to-transparent w-full max-w-md"></div>
              
              <p className="text-neutral-600 text-lg sm:text-xl leading-relaxed max-w-xl font-light">
                Your home should be a reflection of you. It's not just about what it looks like, 
                but how it makes you feel.
              </p>

              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="mb-5 md:mb-0 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-light text-sm tracking-[0.2em] uppercase px-8 py-6 shadow-lg text-white"
                >
                  <Link to="/interiors/about">Read More</Link>
                </Button>
              </div>
            </div>

            {/* Right: Image Grid with Overlaps */}
            <div className="relative h-[600px] lg:h-[700px]">
              {/* Main large image */}
              <div className="absolute top-0 right-0 w-[70%] h-[75%] overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/portfolio/construction/site-work/site-work-06.jpg"
                  alt="Featured design"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stats card */}
              <div className="absolute top-1/3 left-1/4 bg-white/95 backdrop-blur-sm p-8 shadow-xl border border-neutral-100 z-10">
                <div className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <div className="text-4xl font-display text-neutral-900 mb-2">7+</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500">Years Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO CATEGORIES - Kelly Hoppen Style Grid */}
      <section className="relative py-10 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-50 mb-5 sm:mb-8 md:mb-10 lg:mb-14">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
            {/* Residential */}
            <Link
              to="/interiors/portfolio"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <ImageWithFallback
                src={interiorsProjects[0]?.image}
                alt="Residential"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-display text-3xl mb-2 group-hover:text-primary transition-colors">RESIDENTIAL</h3>
                <div className="w-12 h-px bg-white/60 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Commercial */}
            <Link
              to="/interiors/portfolio"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <ImageWithFallback
                src={interiorsProjects[4]?.image || interiorsProjects[0]?.image}
                alt="Commercial"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-display text-3xl mb-2 group-hover:text-primary transition-colors">COMMERCIAL</h3>
                <div className="w-12 h-px bg-white/60 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Maritime/Construction */}
            <Link
              to="/construction"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <ImageWithFallback
                src={constructionProjects[0]?.image || interiorsProjects[2]?.image}
                alt="Construction"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-display text-3xl mb-2 group-hover:text-wood-primary transition-colors">CONSTRUCTION</h3>
                <div className="w-12 h-px bg-white/60 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Outdoor Spaces */}
            <Link
              to="/interiors/portfolio"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <ImageWithFallback
                src={interiorsProjects[3]?.image || interiorsProjects[1]?.image}
                alt="Outdoor Spaces"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-display text-3xl mb-2 group-hover:text-primary transition-colors">SPACES</h3>
                <div className="w-12 h-px bg-white/60 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS - Large Format Showcase */}
      <section className="relative py-5 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-white mb-20 sm:mb-32 md:mb-40 lg:mb-56">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-neutral-200"></div>
              <div className="h-px w-16 bg-neutral-200"></div>
            </div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-neutral-900 leading-[0.85]">
              CREATING TIMELESS<br />INTERIORS.
            </h2>
          </div>

          {/* Featured Project Large */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-24 sm:mb-28 md:mb-32 lg:mb-36">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ImageWithFallback
                src={interiorsProjects[1]?.image}
                alt="Featured project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-neutral-900 mb-6 leading-tight">
                  {interiorsProjects[1]?.title || 'Contemporary Excellence'}
                </h3>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                  {interiorsProjects[1]?.description || 'A sophisticated blend of timeless design and modern living, where every detail has been carefully considered to create an environment of understated luxury.'}
                </p>
              </div>

              {/* Project stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                <div>
                  <div className="text-3xl font-display text-neutral-900 mb-2">
                    {interiorsProjects[1]?.year || '2024'}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Year</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-neutral-900 mb-2">
                    {interiorsProjects[1]?.size || '3,500'}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Sq Ft</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-neutral-900 mb-2">
                    {interiorsProjects[1]?.duration || '6M'}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Duration</div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 font-light text-sm tracking-[0.2em] uppercase px-8 shadow-lg"
                >
                  <Link to="/interiors/portfolio">View Project</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16 sm:mt-20 md:mt-24 lg:mt-28">
            {interiorsProjects.slice(0, 3).map((project, index) => (
              <Link
                key={project.id}
                to="/interiors/portfolio"
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-primary/60 text-xs tracking-[0.25em] uppercase block mb-2">
                    {project.category}
                  </span>
                  <h4 className="font-display text-2xl text-neutral-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Minimal Elegance */}
      <footer className="relative py-20 sm:py-32 md:py-48 lg:py-56 px-6 sm:px-8 md:px-12 lg:px-16 bg-white border-t border-neutral-100">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 md:gap-20 lg:gap-32 mb-16 sm:mb-20 md:mb-24 lg:mb-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 border-b border-neutral-100">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 border border-neutral-200 flex items-center justify-center">
                  <span className="font-display text-2xl text-neutral-900">H</span>
                </div>
                <div>
                  <p className="text-neutral-900 text-sm tracking-[0.2em]">HOUSE OF</p>
                  <p className="text-neutral-600 text-xs tracking-[0.3em]">FARIDAH</p>
                </div>
              </div>
              <p className="text-neutral-600 text-sm font-light leading-relaxed max-w-xs">
                Creating timeless interiors and exceptional construction for over 45 years.
              </p>
            </div>
            
            {/* Links - Interiors */}
            <div>
              <h4 className="text-primary font-display text-lg mb-6 tracking-wide">Interiors</h4>
              <nav className="space-y-3">
                <Link to="/interiors" className="block text-neutral-600 hover:text-primary transition-colors text-sm">Home</Link>
                <Link to="/interiors/about" className="block text-neutral-600 hover:text-primary transition-colors text-sm">About</Link>
                <Link to="/interiors/portfolio" className="block text-neutral-600 hover:text-primary transition-colors text-sm">Portfolio</Link>
                <Link to="/interiors/services" className="block text-neutral-600 hover:text-primary transition-colors text-sm">Services</Link>
                <Link to="/interiors/contact" className="block text-neutral-600 hover:text-primary transition-colors text-sm">Contact</Link>
              </nav>
            </div>

            {/* Links - Construction */}
            <div>
              <h4 className="text-wood-primary font-display text-lg mb-6 tracking-wide">Construction</h4>
              <nav className="space-y-3">
                <Link to="/construction" className="block text-neutral-600 hover:text-wood-primary transition-colors text-sm">Home</Link>
                <Link to="/construction/about" className="block text-neutral-600 hover:text-wood-primary transition-colors text-sm">About</Link>
                <Link to="/construction/portfolio" className="block text-neutral-600 hover:text-wood-primary transition-colors text-sm">Portfolio</Link>
                <Link to="/construction/services" className="block text-neutral-600 hover:text-wood-primary transition-colors text-sm">Services</Link>
                <Link to="/construction/contact" className="block text-neutral-600 hover:text-wood-primary transition-colors text-sm">Contact</Link>
              </nav>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-neutral-400 text-xs">
            <p className="tracking-[0.2em] uppercase font-light">
              © 2025 House of Faridah. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-neutral-200"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
              <div className="h-px w-12 bg-neutral-200"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}