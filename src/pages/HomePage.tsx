import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import aboutMeImage from '/about-me.png';
import { Card, CardContent } from '../components/ui/card';
import { ConsultationDialog } from '../components/ConsultationDialog';
import { Home, MessageCircle, Layout, Palette, Box, Sofa } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'Contemporary Lagos Residence',
    category: 'Living Rooms',
    image: '/portfolio/interiors/contemporary-lagos-residence/living-room-view.jpg',
  },
  {
    id: 2,
    title: 'Glamorous Gold & Crystal Kitchen',
    category: 'Kitchens',
    image: '/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
  },
  {
    id: 3,
    title: 'Modern Athletic Sanctuary',
    category: 'Bedrooms',
    image: '/portfolio/interiors/modern-athletic-bedroom/bedroom-media-wall.jpg',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/portfolio/interiors/luxury-gold-kitchen/kitchen-full-view.jpg"
            alt="Elegant interior design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-block backdrop-elegant rounded-full mb-6 shadow-lg hover-lift">
              <div className="px-6 py-2">
                <p className="text-luxury-spacing magenta-gradient-text">✦ INTERIOR DESIGN & STYLING ✦</p>
              </div>
            </div>
          </div>
          <div className="animate-sophisticated-zoom" style={{animationDelay: '0.3s'}}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl mb-8 text-white drop-shadow-2xl tracking-tight text-reveal">
              House of Faridah
            </h1>
          </div>
          <div className="inline-block px-8 py-1 mb-8 animate-elegant-slide" style={{animationDelay: '0.5s'}}>
            <p className="text-xl sm:text-2xl text-white/95 drop-shadow-lg italic animate-parallax-float">
              Where elegance meets comfort, and every space tells a beautiful story
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mt-6 animate-luxury-glow" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-premium-rotate" style={{animationDelay: '0.7s'}}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-magenta-dark hover:from-primary/90 hover:to-magenta-dark/90 shadow-xl border border-white/20 luxury-hover premium-card-3d"
            >
              <Link to="/interiors/portfolio">View Portfolio</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-outline-white backdrop-blur-sm luxury-hover premium-card-3d"
            >
              <Link to="/interiors/contact">Get in Touch</Link>
            </Button>
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
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Mobile: Simple title bar at bottom (no gold overlay) */}
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
          <div className="text-center mb-12 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
            <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md hover-lift">
              <p className="text-luxury-spacing magenta-gradient-text">Our Services</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl mb-4 text-luxury-spacing">What I Offer</h2>
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
            <div className="order-2 lg:order-1 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
              <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md hover-lift">
                <p className="text-luxury-spacing magenta-gradient-text">About</p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl mb-6 text-luxury-spacing">Meet Faridah</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With a passion for creating spaces that nurture the soul, I bring a unique blend
                of elegance, warmth, and sophistication to every project. My design philosophy
                centers on understanding your story and translating it into a home that truly
                reflects who you are.
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

            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl animate-fade-in-up hover-lift" style={{animationDelay: '1.7s'}}>
              <ImageWithFallback
                src={aboutMeImage}
                alt="Faridah - Interior Designer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto text-center animate-fade-in-up" style={{animationDelay: '1.9s'}}>
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 shadow-md hover-lift">
            <p className="text-luxury-spacing text-white/90">Process</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mb-6 text-luxury-spacing">Our Design Journey</h2>
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

