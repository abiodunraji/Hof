import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Home, Paintbrush, Ruler, Lightbulb, Sofa, Heart, Sparkles, Package } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Home,
    title: 'Full Home Design',
    description: 'Comprehensive design services from concept to completion, transforming your entire home into a cohesive, beautiful sanctuary.',
    features: [
      'Initial consultation and vision boarding',
      'Complete space planning and layout',
      'Custom color schemes and material selection',
      'Furniture and decor sourcing',
      'Project management and installation oversight',
    ],
  },
  {
    icon: Sparkles,
    title: 'Room Makeover',
    description: 'Focused transformation of individual rooms to refresh and revitalize your space with new energy and style.',
    features: [
      'Single room design consultation',
      'Mood board and concept development',
      'Furniture arrangement and selection',
      'Styling and finishing touches',
      'Shopping assistance and sourcing',
    ],
  },
  {
    icon: Paintbrush,
    title: 'Color Consultation',
    description: 'Expert guidance in selecting the perfect color palettes that create harmony and evoke the right emotions in your space.',
    features: [
      'In-depth color psychology consultation',
      'Custom palette creation',
      'Paint brand and finish recommendations',
      'Coordination with existing elements',
      'Sample testing guidance',
    ],
  },
  {
    icon: Ruler,
    title: 'Space Planning',
    description: 'Optimize your space with intelligent layouts that maximize functionality while maintaining beautiful aesthetics.',
    features: [
      'Detailed floor plans and layouts',
      'Traffic flow optimization',
      'Functional zone creation',
      'Custom built-in recommendations',
      '3D visualization options',
    ],
  },
  {
    icon: Sofa,
    title: 'Furniture Selection',
    description: 'Curated furniture pieces that perfectly complement your style, space, and lifestyle needs.',
    features: [
      'Personalized furniture recommendations',
      'Custom furniture design coordination',
      'Vintage and antique sourcing',
      'Budget-conscious options',
      'Delivery and placement coordination',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    description: 'Strategic lighting solutions that enhance ambiance, highlight features, and create the perfect mood.',
    features: [
      'Layered lighting design',
      'Fixture selection and sourcing',
      'Smart lighting integration',
      'Natural light optimization',
      'Dimming and control solutions',
    ],
  },
  {
    icon: Heart,
    title: 'Styling & Staging',
    description: 'The perfect finishing touches to bring your space to life with carefully selected accessories and art.',
    features: [
      'Decorative accessory selection',
      'Art curation and placement',
      'Textile coordination',
      'Seasonal refresh services',
      'Home staging for sales',
    ],
  },
  {
    icon: Package,
    title: 'E-Design Services',
    description: 'Virtual interior design services perfect for clients who prefer remote collaboration or are on a budget.',
    features: [
      'Online consultation sessions',
      'Digital mood boards and concepts',
      'Shoppable design packages',
      'DIY implementation guides',
      'Email and video support',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We begin with a complimentary consultation to discuss your vision, needs, and budget.',
  },
  {
    step: '02',
    title: 'Proposal & Agreement',
    description: 'I create a detailed proposal outlining the scope, timeline, and investment for your project.',
  },
  {
    step: '03',
    title: 'Design Development',
    description: 'I develop comprehensive design concepts, mood boards, and detailed plans for your approval.',
  },
  {
    step: '04',
    title: 'Sourcing & Procurement',
    description: 'I source all materials, furniture, and decor, managing orders and coordinating deliveries.',
  },
  {
    step: '05',
    title: 'Installation & Styling',
    description: 'I oversee the installation and personally style your space to perfection.',
  },
  {
    step: '06',
    title: 'Final Reveal',
    description: 'Experience the joy of your transformed space with a final walkthrough and styling session.',
  },
];

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-secondary/50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <p className="text-sm tracking-wider text-primary">WHAT I OFFER</p>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-6">Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive interior design services tailored to your unique vision, style, and budget.
            From full home transformations to single room makeovers, I'm here to bring your dreams to life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-primary/20">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <service.icon size={28} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl mb-4">My Design Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A seamless, collaborative journey from initial consultation to final reveal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {process.map((item, index) => (
              <Card key={index} className="bg-white border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl opacity-5 -mt-4 -mr-4">
                  {item.step}
                </div>
                <CardHeader>
                  <div className="text-primary mb-2">{item.step}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('process')}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Detailed Process
            </Button>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669975103152-207f84d2b272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEwODI3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Design consultation"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl mb-6">Why Work With Me?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Personalized Attention</h3>
                    <p className="text-muted-foreground">
                      Every project receives my personal dedication and attention to detail.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Timeless Design</h3>
                    <p className="text-muted-foreground">
                      I create spaces that stand the test of time, not just follow fleeting trends.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Sofa size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Quality Sourcing</h3>
                    <p className="text-muted-foreground">
                      Access to exclusive vendors and artisans for unique, high-quality pieces.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Home size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Seamless Experience</h3>
                    <p className="text-muted-foreground">
                      I handle every detail so you can enjoy the transformation stress-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6">Ready to Begin Your Design Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a complimentary consultation to discuss your vision and how I can help bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="outline"
              className="border-white bg-white text-primary hover:bg-white/90"
            >
              Schedule Consultation
            </Button>
            <Button
              onClick={() => onNavigate('portfolio')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
