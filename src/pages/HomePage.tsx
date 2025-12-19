import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ConsultationDialog } from '../components/ConsultationDialog';
import { Home, MessageCircle, Layout, Palette, Box, Sofa, ChevronLeft, ChevronRight, Award, Users, Sparkles } from 'lucide-react';

// Hero carousel images
const heroSlides = [
  {
    image: '/portfolio/interiors/modern-kitchen-design/kitchen-full-view.jpg',
    title: 'Timeless Elegance',
    subtitle: 'Where luxury meets functionality',
    category: 'Kitchens'
  },
  {
    image: '/portfolio/interiors/contemporary-abuja-residence/lifestyle-shot.jpg',
    title: 'Contemporary Living',
    subtitle: 'Spaces that inspire everyday moments',
    category: 'Living Rooms'
  },
  {
    image: '/portfolio/interiors/executive-luxury-bathroom/luxury-bathroom-vanity-detail.jpg',
    title: 'Sophisticated Retreats',
    subtitle: 'Private sanctuaries of comfort',
    category: 'Bathrooms'
  },
  {
    image: '/portfolio/interiors/minimalist-bedroom-design/bedroom-full-view.jpg',
    title: 'Serene Sanctuaries',
    subtitle: 'Restful spaces designed for tranquility',
    category: 'Bedrooms'
  },
];

const featuredProjects = [
  {
    id: 1,
    title: 'Contemporary Abuja residence',
    category: 'Living Rooms',
    image: '/portfolio/interiors/contemporary-abuja-residence/lifestyle-shot.jpg',
  },
  {
    id: 2,
    title: 'Modern kitchen design',
    category: 'Kitchens',
    image: '/portfolio/interiors/modern-kitchen-design/kitchen-detail-chandelier.jpg',
  },
  {
    id: 3,
    title: 'Sports inspired sneakers store',
    category: 'Commercial',
    image: '/portfolio/interiors/sports-inspired-sneakers-store/basketball-mural-wall.jpg',
  },
];

const services = [
  {
    icon: MessageCircle,
    title: 'Consultation',
    description: 'Comprehensive site visits and client consultations to understand your unique vision and lifestyle needs.',
  },
  {
    icon: Layout,
    title: 'Space Planning',
    description: 'Technical floor plan development with a focus on accessibility, functionality, and spatial optimization.',
  },
  {
    icon: Palette,
    title: 'Design Concept',
    description: 'Custom moodboards and comprehensive visual concepts that capture your aesthetic preferences.',
  },
  {
    icon: Box,
    title: '3D Design',
    description: 'Photorealistic 3D renderings that showcase spatial layouts, lighting, and design elements.',
  },
  {
    icon: Sofa,
    title: 'Furniture & Furnishing',
    description: 'Complete furniture design, production coordination, and professional installation services.',
  },
  {
    icon: Home,
    title: 'Complete Design',
    description: 'Comprehensive project management from initial consultation through final furnishing installation.',
  },
];

export function HomePage() {
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-magenta-dark/10" />
            </div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Main Content */}
              <div className="text-white space-y-8">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-3 backdrop-elegant rounded-full px-6 py-3 animate-fade-in-up">
                  <Sparkles className="w-4 h-4 text-white/90" />
                  <span className="text-sm tracking-[0.2em] uppercase font-medium text-white/90">
                    {heroSlides[currentSlide].category}
                  </span>
                </div>

                {/* Large Title */}
                <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light italic max-w-xl">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="w-16 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-magenta-dark hover:from-primary/90 hover:to-magenta-dark/90 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300"
                  >
                    <Link to="/interiors/portfolio">Explore Portfolio</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                  >
                    <Link to="/interiors/contact">Start Your Project</Link>
                  </Button>
                </div>
              </div>

              {/* Right: Floating Stats Card */}
              <div className="hidden lg:block">
                <div className="backdrop-elegant rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-display text-white mb-1">45+</div>
                        <div className="text-white/80 text-sm uppercase tracking-wider">Years of Excellence</div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-14 h-14 rounded-2xl bg-magenta-dark/20 flex items-center justify-center group-hover:bg-magenta-dark/30 transition-colors">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-display text-white mb-1">500+</div>
                        <div className="text-white/80 text-sm uppercase tracking-wider">Satisfied Clients</div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-14 h-14 rounded-2xl bg-hot-pink/20 flex items-center justify-center group-hover:bg-hot-pink/30 transition-colors">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-display text-white mb-1">300+</div>
                        <div className="text-white/80 text-sm uppercase tracking-wider">Stunning Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full backdrop-elegant border border-white/30 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full backdrop-elegant border border-white/30 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-12 bg-white'
                        : 'w-8 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="hidden sm:flex items-center gap-3 text-white/80 text-sm">
                <span className="font-display text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
                <div className="w-px h-6 bg-white/30"></div>
                <span className="text-white/60">{String(heroSlides.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 hidden lg:block animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-white/60"></div>
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md hover-lift">
              <p className="text-luxury-spacing magenta-gradient-text">Featured Work</p>
            </div>
            <h2 className="font-elegant text-4xl sm:text-5xl mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our latest creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`overflow-hidden group cursor-pointer hover:shadow-xl transition-all border-primary/20 luxury-hover premium-card-3d stagger-animation`}
                style={{animationDelay: `${0.7 + index * 0.15}s`}}
                onClick={() => navigate(`/interiors/portfolio?project=${project.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Mobile: Simple title bar at bottom (no magenta overlay) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:hidden">
                      <p className="text-sm mb-1 text-white/80">{project.category}</p>
                      <h3 className="text-xl text-white font-elegant">{project.title}</h3>
                    </div>
                    {/* Desktop: Magenta overlay with content on hover */}
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex-col justify-end text-white">
                      <p className="text-sm mb-1 opacity-90 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">{project.category}</p>
                      <h3 className="text-xl font-elegant transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/interiors/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up animate-delay-1000">
            <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md hover-lift">
              <p className="text-luxury-spacing magenta-gradient-text">Our Services</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized design services to transform your vision into reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20 bg-white hover-lift animate-fade-in-up" style={{animationDelay: `${1.2 + index * 0.1}s`}}>
                <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl mb-3 font-elegant">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/interiors/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up animate-delay-1500">
              <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md hover-lift">
                <p className="text-luxury-spacing magenta-gradient-text">About</p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl mb-6">Meet Faridah Tella</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With a passion for creating spaces that nurture the soul, Faridat brings a unique blend of elegance, warmth, and sophistication to every project. Her design philosophy centers on understanding the client's story and translating it into a home that truly reflects who they are.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every detail matters, from the softest textures to the most delicate color choices.
                Let me help you create a sanctuary that inspires and delights every single day.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 hover-lift"
              >
                <Link to="/interiors/about">Learn More About Me</Link>
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl animate-fade-in-up hover-lift animate-delay-1700">
              <ImageWithFallback
                src="/about-me.png"
                alt="Faridah - Interior Designer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up animate-delay-1900">
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 shadow-md hover-lift">
            <p className="text-luxury-spacing text-white/90">Process</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mb-6">Our Design Journey</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            From our first conversation to the final reveal, we guide you through a thoughtful, 
            collaborative process designed to bring your dream space to life.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 hover-lift"
          >
            <Link to="/interiors/process">Explore Our Process</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

