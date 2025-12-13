import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../../components/ui/dialog';
import { Calendar, Users, CheckCircle, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { constructionProjects, constructionCategories } from '../../data/portfolioData';

export function ConstructionPortfolioPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = selectedCategory === 'All' 
    ? constructionProjects 
    : constructionProjects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev: number) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev: number) =>
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const getCurrentImage = () => {
    if (!selectedProject) return '';
    if (selectedProject.gallery && selectedProject.gallery.length > 0) {
      return selectedProject.gallery[currentImageIndex];
    }
    return selectedProject.image;
  };

  const showNavigation = selectedProject?.gallery && selectedProject.gallery.length > 1;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 to-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground mb-6">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Our Work</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Project Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our completed projects showcasing quality craftsmanship, innovative solutions, and commitment to excellence across residential, commercial, and renovation work.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {constructionCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category 
                  ? 'bg-foreground hover:bg-foreground/90 text-background' 
                  : 'hover:bg-foreground/10'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-0">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-background">
                    <h3 className="text-xl mb-2">{project.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Year</div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Size</div>
                      <div>{project.size}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal (with gallery navigation when available) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
          {selectedProject && (
            <>
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <DialogDescription className="sr-only">{selectedProject.description}</DialogDescription>

              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 z-[60] w-12 h-12 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 border border-wood-primary/20"
                aria-label="Close"
              >
                <X size={22} className="text-wood-dark" strokeWidth={2.5} />
              </button>

              <div className="relative w-full h-80 md:h-96">
                <div className="absolute inset-0 overflow-hidden">
                  <ImageWithFallback
                    src={getCurrentImage()}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
                </div>

                {showNavigation && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 border border-wood-primary/20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} className="text-wood-dark" strokeWidth={2.5} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 border border-wood-primary/20"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} className="text-wood-dark" strokeWidth={2.5} />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-50 px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-wood-dark text-xs font-semibold shadow-xl">
                      {currentImageIndex + 1} / {selectedProject.gallery.length}
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-40 pointer-events-none">
                  <Badge className="mb-3 bg-white/90 backdrop-blur-sm text-wood-dark border-0 shadow-lg pointer-events-auto">
                    {selectedProject.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-display mb-1.5 drop-shadow-lg">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-8">
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-muted/30 rounded-lg">
                  <div>
                    <Calendar className="w-5 h-5 text-wood-dark mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">Completed</div>
                    <div>{selectedProject.year}</div>
                  </div>
                  <div>
                    <Building2 className="w-5 h-5 text-wood-dark mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">Size</div>
                    <div>{selectedProject.size}</div>
                  </div>
                  <div>
                    <Users className="w-5 h-5 text-wood-dark mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">Duration</div>
                    <div>{selectedProject.duration}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4">Project Highlights</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-wood-dark flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-8 border-t flex gap-4">
                  <Button
                    onClick={() => navigate('/construction/contact')}
                    className="flex-1 bg-foreground hover:bg-foreground/90 text-background"
                  >
                    Start Your Project
                  </Button>
                  <Button
                    onClick={closeModal}
                    variant="outline"
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl text-background/80 mb-8">
            Let's discuss how we can bring your vision to life with the same quality and dedication shown in our portfolio.
          </p>
          <Button
            onClick={() => navigate('/construction/contact')}
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            Get Your Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}
