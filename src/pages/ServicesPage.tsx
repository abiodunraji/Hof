import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MessageCircle, Layout, Palette, Box, Sofa, Home, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const services = [
  {
    id: 'consultation',
    icon: MessageCircle,
    title: 'Consultation',
    subtitle: 'Understanding Your Vision',
    description: 'Comprehensive site visits and client consultations to understand your unique vision, lifestyle needs, and spatial requirements. We collaborate to establish initial design concepts that reflect your personality and functional goals.',
    keyFeatures: [
      'In-depth site assessment and measurements',
      'Lifestyle and preference consultation',
      'Initial design concept development',
      'Project scope and timeline discussion',
      'Budget planning and feasibility review'
    ],
    image: '/portfolio/interiors/contemporary-lagos-residence/living-room-view.jpg',
    duration: '2-3 hours',
    deliverables: 'Initial concept presentation, project roadmap'
  },
  {
    id: 'space-planning',
    icon: Layout,
    title: 'Space Planning',
    subtitle: 'Optimizing Function & Flow',
    description: 'Technical floor plan development with a focus on accessibility, functionality, and spatial optimization. Our detailed planning ensures every square foot serves a purpose while maintaining aesthetic harmony.',
    keyFeatures: [
      'Detailed technical floor plans',
      'Traffic flow optimization',
      'Accessibility compliance review',
      'Furniture placement strategies',
      'Storage and organization solutions'
    ],
    image: '/portfolio/interiors/contemporary-lagos-residence/bedroom-detail.jpg',
    duration: '1-2 weeks',
    deliverables: 'CAD drawings, 2D floor plans, furniture layouts'
  },
  {
    id: 'design-concept',
    icon: Palette,
    title: 'Design Concept',
    subtitle: 'Bringing Ideas to Life',
    description: 'Custom moodboards and comprehensive visual concepts that capture your aesthetic preferences and functional requirements. We translate your vision into cohesive design themes with carefully curated palettes and materials.',
    keyFeatures: [
      'Custom moodboard creation',
      'Color palette development',
      'Material and texture selection',
      'Style direction and theme establishment',
      'Visual concept presentations'
    ],
    image: '/portfolio/interiors/contemporary-lagos-residence/bedroom-mirrors.png',
    duration: '1-2 weeks',
    deliverables: 'Design moodboards, color schemes, material samples'
  },
  {
    id: '3d-design',
    icon: Box,
    title: '3D Design',
    subtitle: 'Visualizing Your Space',
    description: 'Photorealistic 3D renderings that showcase spatial layouts, lighting, and design elements with precise dimensions. Experience your space before it comes to life through detailed visualizations.',
    keyFeatures: [
      'Photorealistic 3D renderings',
      'Multiple angle visualizations',
      'Lighting and shadow studies',
      'Material and finish previews',
      'Virtual walkthroughs available'
    ],
    image: '/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
    duration: '2-3 weeks',
    deliverables: 'High-resolution 3D renders, virtual tour files'
  },
  {
    id: 'furniture-furnishing',
    icon: Sofa,
    title: 'Furniture & Furnishing',
    subtitle: 'Curated Selections & Custom Pieces',
    description: 'Complete furniture design, production coordination, and professional installation services. From custom-built pieces to carefully selected furnishings, we ensure every element perfectly fits your space and style.',
    keyFeatures: [
      'Custom furniture design and production',
      'Curated furniture selection',
      'Fabric and finishing coordination',
      'Professional installation management',
      'Quality assurance and warranty support'
    ],
    image: '/portfolio/interiors/modern-athletic-bedroom/bedroom-full-view.jpg',
    duration: '4-8 weeks',
    deliverables: 'Custom furniture pieces, installation oversight'
  },
  {
    id: 'complete-design',
    icon: Home,
    title: 'Complete Design',
    subtitle: 'Full-Service Project Management',
    description: 'Comprehensive project management from initial consultation through final furnishing installation. Our end-to-end service ensures seamless execution of your complete interior transformation.',
    keyFeatures: [
      'Full project coordination and management',
      'Vendor and contractor liaising',
      'Timeline and budget oversight',
      'Quality control and inspections',
      'Final styling and placement'
    ],
    image: '/portfolio/interiors/executive-luxury-residence/luxury-closet-gallery.jpg',
    duration: '3-6 months',
    deliverables: 'Fully furnished and styled space, project documentation'
  }
];



export function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Matched to Portfolio/Process page styling */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-magenta-light/30 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--magenta)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
            <span className="text-sm tracking-wider magenta-gradient-text">✦ COMPREHENSIVE DESIGN SERVICES ✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-foreground tracking-tight">
            <span className="magenta-gradient-text">Our Services</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From initial consultation to complete installation, we offer a comprehensive suite of interior design services 
            tailored to transform your vision into extraordinary living spaces.
          </p>
        </div>
      </section>

      {/* Services Section - Fixed: Reduced top padding and service gaps */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-secondary/3 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid - Fixed: Reduced gaps from 160-192px to 96-112px */}
          <div className="space-y-24 sm:space-y-28">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center animate-fade-in-up ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Image Section - Redesigned with 16:9 Aspect Ratio & Captions */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    {/* Main Image Container with 16:9 Aspect Ratio - Enhanced ring visibility */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/[0.08] group-hover:ring-primary/20 group-hover:shadow-3xl transition-all duration-500">
                      <ImageWithFallback
                        src={service.image}
                        alt={`${service.title} - ${service.subtitle}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      
                      {/* Service Number Badge - Fixed: Proper padding */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl ring-1 ring-primary/10 group-hover:scale-110 transition-transform duration-300 p-2">
                        <span className="text-base sm:text-lg font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      
                      {/* Duration Badge - Fixed: Better spacing */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl ring-1 ring-primary/10">
                        <span className="text-xs sm:text-sm font-semibold text-primary">{service.duration}</span>
                      </div>
                      
                      {/* Image Caption - Smooth 500ms transition */}
                      <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <p className="text-white font-medium text-lg mb-1">{service.title}</p>
                        <p className="text-white/80 text-sm">{service.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section - Fixed: Unified spacing to 8px grid */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {/* Header Section */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Icon with Premium Styling - Fixed: Reduced icon size for better proportion */}
                      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent text-primary rounded-2xl flex items-center justify-center ring-1 ring-primary/20 hover:ring-primary/30 hover:scale-105 transition-all duration-300 shadow-sm p-3">
                        <service.icon className="w-full h-full" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title & Subtitle */}
                      <div className="flex-1">
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight mb-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-base sm:text-lg text-primary font-medium tracking-wide">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Description with Better Line Height */}
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pl-0 sm:pl-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Features - Fixed: Added padding to icon circles */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-foreground tracking-wide">Key Features</h4>
                    <div className="space-y-3">
                      {service.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/feature">
                          <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center group-hover/feature:bg-primary/20 transition-colors duration-300 p-1">
                            <CheckCircle className="w-full h-full text-primary" strokeWidth={2.5} />
                          </div>
                          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover/feature:text-foreground transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables - Fixed: Added icon padding */}
                  <div className="pt-8 border-t border-primary/10">
                    <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-50/50 to-transparent hover:from-amber-50/80 transition-colors duration-300">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100/50 flex items-center justify-center p-1.5">
                        <Star className="w-full h-full text-amber-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-foreground text-base">Deliverables: </span>
                        <span className="text-muted-foreground text-sm sm:text-base">{service.deliverables}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elegant Divider - Fixed: Removed to prevent double spacing */}
                {index < services.length - 1 && (
                  <div className="col-span-full">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/10 to-primary/20"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/10 to-primary/20"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Fixed: Removed redundant divider, reduced padding */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/8 via-white to-primary/4 overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(212,175,55,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(139,69,19,0.05)_0%,transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header - Fixed: Reduced bottom margin */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24 animate-fade-in-up">
            <div className="inline-flex items-center justify-center px-8 py-3.5 mb-10 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-primary/25 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-primary uppercase">Why Choose HOF Interiors</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-foreground tracking-wide mb-8 px-4 leading-tight">
              Excellence in Every Detail
            </h2>
            
            {/* Decorative Accent Line - Enhanced Visual Separator */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/60"></div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/50"></div>
                </div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/60"></div>
              </div>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
              Our commitment to exceptional design and personalized service sets us apart. 
              We combine artistic vision with technical expertise to create spaces that truly reflect your lifestyle.
            </p>
          </div>

          {/* Content Grid - 8pt Grid Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-start">
            
            {/* Images Gallery - Fixed: Added mobile bottom padding */}
            <div className="relative px-4 sm:px-8 lg:px-0 pb-12 lg:pb-0 animate-fade-in-up order-2 lg:order-1 overflow-hidden" style={{animationDelay: '0.2s'}}>
              {/* Decorative Elements - Fixed: Added -z-10 for proper layering */}
              <div className="absolute -z-10 top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl opacity-60 animate-pulse" style={{animationDuration: '4s'}} />
              <div className="absolute -z-10 bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary/10 to-primary/5 rounded-full blur-2xl opacity-50 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
              
              {/* Balanced 2x2 Grid with 24px Spacing for professional presentation */}
              <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
                {/* Top Left - Living Space */}
                <div className="group relative">
                  <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02] group-hover:ring-primary/20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                      <ImageWithFallback
                        src="/portfolio/interiors/contemporary-lagos-residence/living-room-view.jpg"
                        alt="Elegant living space with premium furnishings"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: 'center 40%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Caption Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-sm font-medium">Living Space Design</p>
                      </div>
                    </div>
                  </div>
                  
                {/* Top Right - Kitchen */}
                <div className="group relative">
                  <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02] group-hover:ring-primary/20 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <ImageWithFallback
                      src="/portfolio/interiors/luxury-gold-kitchen/kitchen-full-view.jpg"
                      alt="Functional kitchen with elegant finishes"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'center 35%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm font-medium">Kitchen Design</p>
                    </div>
                  </div>
                </div>
                  
                  {/* Bottom Left - Bedroom */}
                  <div className="group relative">
                    <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02] group-hover:ring-primary/20 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                      <ImageWithFallback
                        src="/portfolio/interiors/modern-athletic-bedroom/bedroom-full-view.jpg"
                        alt="Modern bedroom with contemporary styling"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: 'center 45%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Caption Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-sm font-medium">Bedroom Design</p>
                      </div>
                    </div>
                  </div>
                
                {/* Bottom Right - Dining */}
                <div className="group relative">
                  <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02] group-hover:ring-primary/20 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <ImageWithFallback
                      src="/portfolio/interiors/contemporary-lagos-residence/dining-area.png"
                      alt="Sophisticated dining room arrangement"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'center center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm font-medium">Dining Room Design</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Content - Fixed: Added bottom margin to prevent overlap with CTA */}
            <div className="space-y-6 px-4 sm:px-0 mb-16 sm:mb-20 lg:mb-24 animate-fade-in-up order-1 lg:order-2" style={{animationDelay: '0.4s'}}>
              {/* Feature Card 1 - Premium Quality - Fixed: Added proper padding */}
              <div className="group relative bg-white/75 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 border border-primary/10 hover:border-primary/25 ring-1 ring-black/5">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl flex items-center justify-center border border-amber-200/50 group-hover:border-amber-300/70 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 p-3">
                    <Star size={24} strokeWidth={2} className="text-amber-600 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      Premium Quality
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      We source only the finest materials and work with skilled craftsmen to ensure lasting beauty and exceptional durability in every project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 - Proven Process - Fixed: Added proper padding */}
              <div className="group relative bg-white/75 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 border border-primary/10 hover:border-primary/25 ring-1 ring-black/5">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl flex items-center justify-center border border-emerald-200/50 group-hover:border-emerald-300/70 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 p-3">
                    <CheckCircle size={24} strokeWidth={2} className="text-emerald-600 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      Proven Process
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Our systematic approach ensures seamless project execution from initial concept to final completion, delivering excellence at every stage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 - Personal Touch - Fixed: Added proper padding */}
              <div className="group relative bg-white/75 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 border border-primary/10 hover:border-primary/25 ring-1 ring-black/5">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl flex items-center justify-center border border-blue-200/50 group-hover:border-blue-300/70 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 p-3">
                    <MessageCircle size={24} strokeWidth={2} className="text-blue-600 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      Personal Touch
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Every project receives dedicated attention and reflects your unique personality, lifestyle needs, and design preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 4 - Timeless Appeal - Fixed: Added proper padding */}
              <div className="group relative bg-white/75 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 border border-primary/10 hover:border-primary/25 ring-1 ring-black/5">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl flex items-center justify-center border border-rose-200/50 group-hover:border-rose-300/70 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 p-3">
                    <Home size={24} strokeWidth={2} className="text-rose-600 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      Timeless Appeal
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      We create designs that transcend trends, ensuring your space remains beautiful, functional, and relevant for years to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Complete Overhaul: Fixed buttons, animations, spacing */}
      <section 
        className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-primary text-white overflow-hidden"
        aria-label="Call to action"
      >
        {/* Subtle Background Effects - Optimized for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-primary/98" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge - Improved */}
          <div className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-white uppercase">Start Your Transformation</span>
          </div>
          
          {/* Heading - Better responsive sizing */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-6 sm:mb-8 tracking-tight leading-tight px-4">
            Ready to Transform Your Space?
          </h2>
          
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
          
          {/* Description - Improved readability */}
          <p className="text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 text-white/95 max-w-3xl mx-auto leading-relaxed px-4">
            Let's collaborate to create a space that perfectly reflects your vision and enhances your lifestyle. 
            Schedule your consultation today and take the first step toward your dream interior.
          </p>
          
          {/* CTA Buttons - Matched to AboutPage styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-12 px-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300"
            >
              <Link to="/interiors/contact">
                <span>Schedule Consultation</span>
                <ArrowRight size={18} className="ml-2" strokeWidth={2} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-outline-white hover:scale-105 transition-all duration-300"
            >
              <Link to="/interiors/portfolio">View Portfolio</Link>
            </Button>
          </div>
          
          {/* Trust Indicators - Better mobile layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90 text-sm px-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-medium">Free Consultation</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Star size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-medium">Personalized Design</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Home size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-medium">Premium Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
