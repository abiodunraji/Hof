import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Shield,
  Award,
  Users,
  Target,
  Heart,
  TrendingUp
} from 'lucide-react';

// This page only states what the owner has confirmed. Years in business, project counts, staff numbers,
// awards, licences and certifications were removed on 24 Nov 2026 because none of them was confirmed.
// Add one back only when the owner supplies it (and, for a credential, its number or certificate).

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'We maintain the highest safety standards on every project, protecting our team, clients, and community.'
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'Uncompromising commitment to quality craftsmanship and materials in every build.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Honest communication, transparent processes, and ethical business practices define who we are.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Embracing new technologies and sustainable building practices for better outcomes.'
  }
];

export function ConstructionAboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/portfolio/construction/site-work/site-work-06.jpg"
            alt="HOF Construction site work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-background mb-6">
            About HOF Construction
          </h1>
          <p className="text-xl text-background/90 max-w-3xl mx-auto">
            The construction side of House of Faridah, working alongside HOF Interiors.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-foreground/10">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-foreground mb-4" />
                <h3 className="text-2xl mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver superior construction services through innovative solutions, exceptional craftsmanship, and unwavering commitment to safety and quality. We strive to build lasting relationships by exceeding expectations on every project.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/10">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-foreground mb-4" />
                <h3 className="text-2xl mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the region's most trusted and respected construction company, recognized for transforming visions into reality through sustainable practices, cutting-edge techniques, and a people-first approach that values both our team and clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Start Your Construction Project</h2>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8">
            Tell us about your project and we will send you a free quote.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link to="/construction/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
