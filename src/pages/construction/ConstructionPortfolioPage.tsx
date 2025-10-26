import { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Calendar, DollarSign, Users, CheckCircle, Building2 } from 'lucide-react';

interface ConstructionPortfolioPageProps {
  onNavigate: (page: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'Riverside Corporate Center',
    category: 'Commercial',
    location: 'Downtown District',
    year: '2024',
    budget: '$8.5M',
    size: '75,000 sq ft',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modern office complex featuring sustainable design, state-of-the-art facilities, and LEED Gold certification.',
    highlights: [
      'LEED Gold Certified',
      'Energy-efficient HVAC system',
      'Rooftop solar installation',
      'Underground parking for 200 vehicles'
    ]
  },
  {
    id: 2,
    title: 'Hillside Luxury Residence',
    category: 'Residential',
    location: 'Hillside Estate',
    year: '2024',
    budget: '$3.2M',
    size: '6,500 sq ft',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Custom-built luxury home with panoramic views, featuring high-end finishes and smart home integration.',
    highlights: [
      'Custom architectural design',
      'Smart home automation',
      'Infinity pool with spa',
      'Wine cellar and home theater'
    ]
  },
  {
    id: 3,
    title: 'Heritage Building Restoration',
    category: 'Renovation',
    location: 'Heritage District',
    year: '2023',
    budget: '$2.1M',
    size: '15,000 sq ft',
    duration: '12 months',
    image: 'https://images.unsplash.com/photo-1760331283499-abccea681c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBwcm9qZWN0fGVufDF8fHx8MTc2MTUwMjY2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Complete restoration of historic 1920s building, preserving original character while modernizing infrastructure.',
    highlights: [
      'Historic preservation approved',
      'Original facade restoration',
      'Modern electrical and plumbing',
      'Seismic retrofitting'
    ]
  },
  {
    id: 4,
    title: 'Lakeside Medical Plaza',
    category: 'Commercial',
    location: 'Lakeside District',
    year: '2023',
    budget: '$5.7M',
    size: '42,000 sq ft',
    duration: '16 months',
    image: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjE0MjU3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Multi-specialty medical facility with advanced infrastructure for healthcare services.',
    highlights: [
      'Healthcare-grade infrastructure',
      'Advanced HVAC filtration',
      'Backup power systems',
      'ADA compliant throughout'
    ]
  },
  {
    id: 5,
    title: 'Sunset Townhome Development',
    category: 'Residential',
    location: 'Sunset Valley',
    year: '2023',
    budget: '$6.8M',
    size: '24 units',
    duration: '20 months',
    image: 'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modern townhome community featuring sustainable design and community amenities.',
    highlights: [
      '24 luxury townhomes',
      'Community clubhouse',
      'Green building practices',
      'Electric vehicle charging stations'
    ]
  },
  {
    id: 6,
    title: 'Industrial Warehouse Complex',
    category: 'Commercial',
    location: 'Industrial Park',
    year: '2022',
    budget: '$4.3M',
    size: '95,000 sq ft',
    duration: '10 months',
    image: 'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Large-scale warehouse facility with advanced logistics infrastructure and office space.',
    highlights: [
      'Clear-span warehouse design',
      'Multiple loading docks',
      'Office and break room facilities',
      'Advanced security systems'
    ]
  }
];

const categories = ['All', 'Commercial', 'Residential', 'Renovation'];

export function ConstructionPortfolioPage({ onNavigate }: ConstructionPortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

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
            {categories.map((category) => (
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
                    onClick={(e) => {
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
              const project = projects.find(p => p.id === selectedProject);
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
                        onClick={() => onNavigate('contact')}
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
            onClick={() => onNavigate('contact')}
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
