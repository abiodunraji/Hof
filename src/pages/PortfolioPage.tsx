import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { X } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

const categories = ['All', 'Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms', 'Commercial'];

const projects = [
  {
    id: 1,
    title: 'Serene Living Space',
    category: 'Living Rooms',
    description: 'A minimalist haven featuring soft neutrals and natural textures that create a calming atmosphere.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Minimalist', 'Neutral', 'Contemporary'],
    location: 'Hillside Residence',
    year: '2024',
    budget: '$65,000',
    duration: '3 months',
    size: '800 sq ft',
    fullDescription: 'This serene living space was designed to be a peaceful retreat from the busy world. Using a carefully curated palette of soft neutrals, natural wood tones, and organic textures, we created a harmonious environment that promotes relaxation and mindfulness.',
    highlights: [
      'Custom-built floating shelves in reclaimed oak',
      'Japanese-inspired minimalist furniture selection',
      'Hand-selected natural fiber rugs and textiles',
      'Integrated LED lighting system with dimming controls',
      'Curated collection of artisanal pottery and ceramics'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    id: 2,
    title: 'Romantic Bedroom Retreat',
    category: 'Bedrooms',
    description: 'An elegant sanctuary with soft pink accents and luxurious textures for ultimate relaxation.',
    image: 'https://images.unsplash.com/photo-1759691321555-94fed84288fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Elegant', 'Romantic', 'Cozy'],
    location: 'Penthouse Suite',
    year: '2024',
    budget: '$45,000',
    duration: '2 months',
    size: '400 sq ft',
    fullDescription: 'This romantic bedroom retreat was designed to be the ultimate sanctuary for rest and intimacy. Soft blush tones, luxurious velvet textures, and carefully curated lighting create an atmosphere of warmth and elegance.',
    highlights: [
      'Custom upholstered headboard in blush velvet',
      'Hand-selected vintage brass fixtures',
      'Layered lighting design with crystal chandelier',
      'Luxurious Egyptian cotton bedding collection',
      'Antique French nightstands with marble tops'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1759691321555-94fed84288fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    id: 3,
    title: 'Modern Culinary Haven',
    category: 'Kitchens',
    description: 'A sophisticated kitchen blending functionality with timeless design elements.',
    image: 'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTA5MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Modern', 'Functional', 'Sleek'],
    location: 'Contemporary Villa',
    year: '2024',
    budget: '$85,000',
    duration: '4 months',
    size: '500 sq ft',
    fullDescription: 'This modern culinary haven seamlessly blends cutting-edge functionality with timeless elegance. Every element was carefully chosen to create a space that inspires culinary creativity while maintaining sophisticated aesthetics.',
    highlights: [
      'Custom Italian marble waterfall island',
      'Professional-grade appliance suite',
      'Hidden storage solutions throughout',
      'Integrated wine storage and display',
      'Statement lighting with brass accents'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTA5MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  },
  {
    id: 4,
    title: 'Spa-Inspired Bathroom',
    category: 'Bathrooms',
    description: 'A luxurious bathroom retreat featuring natural materials and serene aesthetics.',
    image: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbXxlbnwxfHx8fDE3NjEwMzIyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Luxury', 'Spa-like', 'Tranquil'],
    location: 'Luxury Condo',
    year: '2024',
    budget: '$55,000',
    duration: '3 months',
    size: '200 sq ft',
    fullDescription: 'This spa-inspired bathroom transforms daily routines into luxurious rituals. Natural stone, warm wood tones, and carefully selected fixtures create a serene sanctuary for relaxation and rejuvenation.',
    highlights: [
      'Natural stone rainfall shower',
      'Custom teak vanity with integrated storage',
      'Freestanding soaking tub',
      'Heated floor system',
      'Ambient lighting design'
    ]
  },
  {
    id: 5,
    title: 'Executive Office Space',
    category: 'Commercial',
    description: 'A professional yet inviting workspace designed to inspire productivity and creativity.',
    image: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzYxMTI2NTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Professional', 'Modern', 'Sophisticated'],
    location: 'Corporate Tower',
    year: '2024',
    budget: '$75,000',
    duration: '2 months',
    size: '600 sq ft',
    fullDescription: 'This executive office space balances professionalism with comfort, creating an environment that fosters productivity while reflecting executive status. Clean lines, premium materials, and thoughtful lighting design create an inspiring workspace.',
    highlights: [
      'Custom mahogany executive desk',
      'Integrated technology solutions',
      'Premium leather seating',
      'Statement wall art collection',
      'Sound-dampening design elements'
    ]
  },
  {
    id: 6,
    title: 'Urban Loft Living',
    category: 'Living Rooms',
    description: 'Contemporary loft design with warm accents and carefully curated furnishings.',
    image: 'https://images.unsplash.com/photo-1639173925921-5d5fd027713c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEwNzE1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Urban', 'Contemporary', 'Warm'],
  },
  {
    id: 7,
    title: 'Blush Pink Oasis',
    category: 'Bedrooms',
    description: 'A dreamy bedroom featuring soft pink tones and luxurious velvet textures.',
    image: 'https://images.unsplash.com/photo-1595081203419-e577b42effd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGluayUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyOTczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Feminine', 'Dreamy', 'Elegant'],
  },
  {
    id: 8,
    title: 'Elegant Home Office',
    category: 'Commercial',
    description: 'A feminine home office that balances beauty with productivity.',
    image: 'https://images.unsplash.com/photo-1669975103152-207f84d2b272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEwODI3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Chic', 'Organized', 'Inspiring'],
  },
  {
    id: 9,
    title: 'Refined Home Decor',
    category: 'Living Rooms',
    description: 'Sophisticated living space with carefully selected statement pieces and warm lighting.',
    image: 'https://images.unsplash.com/photo-1704428381540-b5be472a4d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc2MTEyOTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Refined', 'Curated', 'Timeless'],
  },
];

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gold-light/30 via-secondary/40 to-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative animate-sophisticated-zoom">
          <div className="inline-block px-6 py-2 backdrop-elegant rounded-full mb-6 shadow-md animate-prestige-pulse">
            <p className="text-luxury-spacing gold-gradient-text text-reveal">✦ MY WORK ✦</p>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl mb-6 text-luxury-spacing animate-elegant-slide" style={{animationDelay: '0.2s'}}>
            <span className="gold-gradient-text">Portfolio</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 animate-luxury-glow" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-parallax-float" style={{animationDelay: '0.4s'}}>
            Explore my collection of thoughtfully designed spaces where elegance meets functionality.
            Each project tells a unique story of transformation and beauty.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'border-primary/30 text-primary hover:bg-primary/10'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-primary/20 luxury-hover premium-card-3d stagger-animation"
                style={{animationDelay: `${0.2 + index * 0.12}s`}}
                onClick={() => handleProjectClick(project)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="text-2xl mb-2 font-elegant">{project.title}</h3>
                      <p className="text-sm mb-4 opacity-90">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-white/20 text-white border-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="font-display text-4xl sm:text-5xl mb-6 text-luxury-spacing">Inspired by What You See?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Let's work together to create your dream space. Every project begins with a conversation.
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90 hover-lift"
          >
            Start Your Project
          </Button>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
              
              <div className="relative h-64 md:h-80 overflow-hidden">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <Badge variant="secondary" className="mb-2 bg-primary text-white">
                    {selectedProject.category}
                  </Badge>
                  <h2 className="text-3xl font-display mb-2">{selectedProject.title}</h2>
                  <p className="text-lg opacity-90">{selectedProject.location}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Completed</p>
                      <p className="text-lg font-elegant text-primary">{selectedProject.year}</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Investment</p>
                      <p className="text-lg font-elegant text-primary">{selectedProject.budget}</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="text-lg font-elegant text-primary">{selectedProject.duration}</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Space</p>
                      <p className="text-lg font-elegant text-primary">{selectedProject.size}</p>
                    </div>
                  </div>

                  {selectedProject.highlights && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-elegant mb-4 text-primary">Design Highlights</h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        closeModal();
                        onNavigate('contact');
                      }}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start Your Project
                    </Button>
                    <Button
                      onClick={() => {
                        closeModal();
                        onNavigate('contact');
                      }}
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      Request Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
