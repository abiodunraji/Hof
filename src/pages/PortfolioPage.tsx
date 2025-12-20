import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { EnhancedPortfolioModal } from '../components/EnhancedPortfolioModal';
import { interiorsProjects, interiorsCategories } from '../data/portfolioData';

export function PortfolioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check for project ID in URL parameters and open modal
  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      const project = interiorsProjects.find(p => p.id === parseInt(projectId));
      if (project) {
        setSelectedProject(project);
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matched to uniform styling */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-magenta-light/30 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--magenta)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
            <span className="text-sm tracking-wider magenta-gradient-text">✦ OUR WORK ✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-foreground tracking-tight">
            <span className="magenta-gradient-text">Portfolio</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our collection of thoughtfully designed spaces where elegance meets functionality.
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
      <EnhancedPortfolioModal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
          else setIsModalOpen(true);
        }}
        project={selectedProject}
      />
    </div>
  );
}
