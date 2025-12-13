import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { interiorsProjects, interiorsCategories } from '../data/portfolioData';

export function PortfolioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check for project ID in URL parameters and open modal
  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      const project = interiorsProjects.find(p => p.id === parseInt(projectId));
      if (project) {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
        // Clean up URL parameter
        navigate('/interiors/portfolio', { replace: true });
      }
    }
  }, [searchParams, navigate]);

  const filteredProjects = activeCategory === 'All'
    ? interiorsProjects
    : interiorsProjects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  // Get the current image to display (use gallery if available, otherwise use main image)
  const getCurrentImage = () => {
    if (!selectedProject) return '';
    if (selectedProject.gallery && selectedProject.gallery.length > 0) {
      return selectedProject.gallery[currentImageIndex];
    }
    return selectedProject.image;
  };

  // Check if navigation buttons should be shown
  const showNavigation = selectedProject?.gallery && selectedProject.gallery.length > 1;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matched to uniform styling */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-magenta-light/30 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--magenta)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
            <span className="text-sm tracking-wider magenta-gradient-text">✦ MY WORK ✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-foreground tracking-tight">
            <span className="magenta-gradient-text">Portfolio</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore my collection of thoughtfully designed spaces where elegance meets functionality.
            Each project tells a unique story of transformation and beauty.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {interiorsCategories.map((category) => (
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
                    {/* Mobile: Simple title bar at bottom (no magenta overlay) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:hidden">
                      <h3 className="text-xl text-white font-elegant">{project.title}</h3>
                    </div>
                    {/* Desktop: Magenta overlay with content on hover */}
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex-col justify-end text-white">
                      <h3 className="text-2xl mb-2 font-elegant transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                      <p className="text-sm mb-4 opacity-90 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-100">
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
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up animate-delay-500">
          <h2 className="font-display text-4xl sm:text-5xl mb-6">Inspired by What You See?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Let's work together to create your dream space. Every project begins with a conversation.
          </p>
          <Button
            onClick={() => navigate('/interiors/contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90 hover-lift"
          >
            Start Your Project
          </Button>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
          {selectedProject && (
            <>
              {/* Accessibility elements for screen readers */}
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {selectedProject.description}
              </DialogDescription>
              
              {/* Custom close button with elegant hover effect */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-[60] w-12 h-12 bg-white/95 hover:bg-primary rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-125 group ring-2 ring-primary/20 hover:ring-primary/60"
                aria-label="Close"
              >
                <X size={22} className="text-gray-800 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
              </button>
              
              {/* Image Section with Navigation */}
              <div className="relative w-full h-80 md:h-96">
                <div className="absolute inset-0 overflow-hidden">
                  <ImageWithFallback
                    src={getCurrentImage()}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
                </div>
                
                {/* Navigation Buttons - Centered vertically on image */}
                {showNavigation && (
                  <>
                    {/* Left Arrow */}
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-4 -translate-y-1/2 z-50 w-11 h-11 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 border border-primary/20 gallery-nav-button"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} className="text-primary" strokeWidth={2.5} />
                    </button>
                    
                    {/* Right Arrow */}
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-4 -translate-y-1/2 z-50 w-11 h-11 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 border border-primary/20 gallery-nav-button"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} className="text-primary" strokeWidth={2.5} />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-primary text-xs font-semibold shadow-xl gallery-image-counter">
                      {currentImageIndex + 1} / {selectedProject.gallery.length}
                    </div>
                  </>
                )}
                
                {/* Title Overlay - Bottom with proper spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-40 pointer-events-none">
                  <Badge variant="secondary" className="mb-3 bg-primary text-white shadow-lg pointer-events-auto">
                    {selectedProject.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-display mb-1.5 drop-shadow-lg">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Completed</p>
                      <p className="text-lg font-elegant text-primary">{selectedProject.year}</p>
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
                        navigate('/interiors/contact');
                      }}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start Your Project
                    </Button>
                    <Button
                      onClick={() => {
                        closeModal();
                        navigate('/interiors/contact');
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
