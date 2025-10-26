import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

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
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Minimalist', 'Neutral', 'Contemporary'],
  },
  {
    id: 2,
    title: 'Romantic Bedroom Retreat',
    category: 'Bedrooms',
    description: 'An elegant sanctuary with soft pink accents and luxurious textures for ultimate relaxation.',
    image: 'https://images.unsplash.com/photo-1759691321555-94fed84288fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Elegant', 'Romantic', 'Cozy'],
  },
  {
    id: 3,
    title: 'Modern Culinary Haven',
    category: 'Kitchens',
    description: 'A sophisticated kitchen blending functionality with timeless design elements.',
    image: 'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTA5MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Modern', 'Functional', 'Sleek'],
  },
  {
    id: 4,
    title: 'Spa-Inspired Bathroom',
    category: 'Bathrooms',
    description: 'A luxurious bathroom retreat featuring natural materials and serene aesthetics.',
    image: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbXxlbnwxfHx8fDE3NjEwMzIyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Luxury', 'Spa-like', 'Tranquil'],
  },
  {
    id: 5,
    title: 'Executive Office Space',
    category: 'Commercial',
    description: 'A professional yet inviting workspace designed to inspire productivity and creativity.',
    image: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzYxMTI2NTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Professional', 'Modern', 'Sophisticated'],
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

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-secondary/50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <p className="text-sm tracking-wider text-primary">MY WORK</p>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-6">Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-primary/20"
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
                      <h3 className="text-2xl mb-2">{project.title}</h3>
                      <p className="text-sm mb-4 opacity-90">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6">Inspired by What You See?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's work together to create your dream space. Every project begins with a conversation.
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Start Your Project
          </Button>
        </div>
      </section>
    </div>
  );
}
