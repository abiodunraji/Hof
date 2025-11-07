import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Calendar, DollarSign, Users, CheckCircle, Building2 } from 'lucide-react';
import { constructionProjects, constructionCategories } from '../../data/portfolioData';

export function ConstructionPortfolioPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? constructionProjects 
    : constructionProjects.filter(p => p.category === selectedCategory);

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
                onClick={() => setSelectedProject(project.id)}
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
                    <div className="flex items-center gap-2 text-sm text-background/90">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Year</div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Budget</div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {project.budget.replace('$', '')}
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
                      setSelectedProject(project.id);
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = constructionProjects.find(p => p.id === selectedProject);
              if (!project) return null;

              return (
                <>
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition"
                    >
                      <span className="text-xl">×</span>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-8 text-background">
                      <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-0 mb-3">
                        {project.category}
                      </Badge>
                      <h2 className="text-3xl mb-2">{project.title}</h2>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="grid md:grid-cols-4 gap-6 mb-8 p-6 bg-muted/30 rounded-lg">
                      <div>
                        <Calendar className="w-5 h-5 text-foreground mb-2" />
                        <div className="text-sm text-muted-foreground mb-1">Completed</div>
                        <div>{project.year}</div>
                      </div>
                      <div>
                        <DollarSign className="w-5 h-5 text-foreground mb-2" />
                        <div className="text-sm text-muted-foreground mb-1">Budget</div>
                        <div>{project.budget}</div>
                      </div>
                      <div>
                        <Building2 className="w-5 h-5 text-foreground mb-2" />
                        <div className="text-sm text-muted-foreground mb-1">Size</div>
                        <div>{project.size}</div>
                      </div>
                      <div>
                        <Users className="w-5 h-5 text-foreground mb-2" />
                        <div className="text-sm text-muted-foreground mb-1">Duration</div>
                        <div>{project.duration}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl mb-4">Project Highlights</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
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
                        onClick={() => setSelectedProject(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

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
