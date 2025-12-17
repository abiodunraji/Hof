import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar, Building2 } from 'lucide-react';
import { EnhancedPortfolioModal } from '../../components/EnhancedPortfolioModal';
import { constructionProjects, constructionCategories } from '../../data/portfolioData';

export function ConstructionPortfolioPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? constructionProjects 
    : constructionProjects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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

      <EnhancedPortfolioModal
        open={isModalOpen}
        onOpenChange={(open) => (open ? setIsModalOpen(true) : closeModal())}
        project={selectedProject}
        onPrimaryCta={() => {
          closeModal();
          navigate('/construction/contact');
        }}
        onSecondaryCta={() => {
          closeModal();
          navigate('/construction/contact');
        }}
      />

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
