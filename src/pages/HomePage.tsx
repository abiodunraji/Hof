import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Sparkles, Heart, Home } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const featuredProjects = [
  {
    id: 1,
    title: 'Serene Living Space',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjEwNjI0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Romantic Bedroom',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1759691321555-94fed84288fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Elegant Kitchen',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTA5MDM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Creating beautiful, personalized homes that reflect your unique style and story.',
  },
  {
    icon: Sparkles,
    title: 'Styling & Decor',
    description: 'Curating the perfect finishing touches to bring elegance and warmth to your space.',
  },
  {
    icon: Heart,
    title: 'Color Consultation',
    description: 'Expert guidance in selecting harmonious color palettes that evoke the right emotions.',
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1595081203419-e577b42effd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGluayUyMGludGVyaW9yfGVufDF8fHx8MTc2MTEyOTczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Elegant interior design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-4">
              <p className="text-sm tracking-wider text-primary">INTERIOR DESIGN & STYLING</p>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-white drop-shadow-lg">
            House of Faridah
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white drop-shadow-md">
            Where elegance meets comfort, and every space tells a beautiful story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('portfolio')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              View Portfolio
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="outline"
              className="border-white bg-white/90 hover:bg-white"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our latest creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all border-primary/20"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm mb-1 opacity-90">{project.category}</p>
                      <h3 className="text-xl">{project.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('portfolio')}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4">What I Offer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized design services to transform your vision into reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20 bg-white">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('services')}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Explore All Services
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-5xl mb-6">Meet Faridah</h2>
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
                onClick={() => onNavigate('about')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Learn More About Me
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758817864979-56da98f34f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBkZXNpZ25lcnxlbnwxfHx8fDE3NjExMjk3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Faridah - Interior Designer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6">Our Design Journey</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            From our first conversation to the final reveal, we guide you through a thoughtful, 
            collaborative process designed to bring your dream space to life.
          </p>
          <Button
            onClick={() => onNavigate('process')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Explore Our Process
          </Button>
        </div>
      </section>
    </div>
  );
}
