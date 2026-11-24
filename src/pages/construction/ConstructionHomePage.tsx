import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Building2, HardHat, Hammer, CheckCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Residential Construction',
    description: 'Custom home building from foundation to finish, crafted to your exact specifications.',
    image: '/portfolio/construction/site-work/site-work-04.jpg'
  },
  {
    icon: HardHat,
    title: 'Commercial Building',
    description: 'Professional commercial construction services for offices, retail, and industrial spaces.',
    image: '/portfolio/construction/site-work/site-work-08.jpg'
  },
  {
    icon: Hammer,
    title: 'Renovations & Additions',
    description: 'Transform existing spaces with expert renovation and seamless home additions.',
    image: '/portfolio/construction/site-work/site-work-12.jpg'
  }
];

// Numbers (projects completed, years, satisfaction, staff) and credentials (licences, insurance,
// warranties, track record) were removed on 24 Nov 2026 because the owner has not confirmed them.
// Add one back only when she supplies it.

export function ConstructionHomePage() {
  // The newest real projects from the portfolio (none yet, so the section stays hidden).
  const { constructionProjects } = usePortfolioData();
  const recentProjects = constructionProjects.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/portfolio/construction/site-work/site-work-10.jpg"
            alt="HOF Construction Site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-background mb-6">
              Building Your Vision Into Reality
            </h1>
            <p className="text-xl text-background/90 mb-8 leading-relaxed">
              Professional construction services with a commitment to quality, safety, and excellence. From residential homes to commercial buildings, we deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/construction/contact">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-background/20 backdrop-blur-sm border-2 border-background text-background hover:bg-background hover:text-foreground transition-all"
              >
                <Link to="/construction/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive construction solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Projects Preview (only when there are real projects to show) */}
      {recentProjects.length > 0 && (
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Recent Projects</h2>
              <p className="text-xl text-muted-foreground">
                Showcasing our latest completed works
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              <Link to="/construction/portfolio">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {recentProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {project.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link to="/construction/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your construction needs and bring your vision to life. Contact us today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link to="/construction/contact">Get Your Free Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-background/20 backdrop-blur-sm border-2 border-background text-background hover:bg-background hover:text-foreground transition-all"
            >
              <Link to="/construction/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
