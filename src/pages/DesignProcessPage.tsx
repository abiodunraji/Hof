import { 
  MessageSquare, 
  Lightbulb, 
  PenTool, 
  Palette, 
  Package, 
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

interface DesignProcessPageProps {
  onNavigate: (page: string) => void;
}

const processSteps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery & Consultation',
    duration: '1-2 weeks',
    description: 'We begin with an in-depth conversation about your vision, lifestyle, and design preferences. This is where we get to know you and understand what makes your space uniquely yours.',
    activities: [
      'Initial consultation meeting',
      'Lifestyle and needs assessment',
      'Budget discussion and planning',
      'Site measurement and analysis',
      'Inspiration board creation'
    ],
    color: 'from-primary/20 to-primary/10'
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Concept Development',
    duration: '2-3 weeks',
    description: 'Drawing inspiration from our consultation, we develop a cohesive design concept that captures your personality and style while addressing all functional requirements.',
    activities: [
      'Mood board and concept presentation',
      'Space planning and layout options',
      'Style direction refinement',
      'Color palette development',
      'Material and finish exploration'
    ],
    color: 'from-accent/30 to-accent/15'
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Design Development',
    duration: '3-4 weeks',
    description: 'We refine the approved concept into detailed design plans, selecting every element from furniture to fixtures with meticulous attention to detail.',
    activities: [
      'Detailed floor plans and elevations',
      'Custom furniture design',
      'Lighting design and layout',
      'Material specifications',
      '3D renderings and visualizations'
    ],
    color: 'from-primary/25 to-primary/12'
  },
  {
    number: '04',
    icon: Palette,
    title: 'Selection & Sourcing',
    duration: '2-3 weeks',
    description: 'With the design finalized, we carefully curate and source every piece, ensuring quality, authenticity, and perfect alignment with your aesthetic.',
    activities: [
      'Furniture and decor selection',
      'Fabric and material ordering',
      'Custom piece commission',
      'Vendor coordination',
      'Sample review and approval'
    ],
    color: 'from-accent/35 to-accent/18'
  },
  {
    number: '05',
    icon: Package,
    title: 'Installation & Styling',
    duration: '1-2 weeks',
    description: 'This is where the magic happens. We oversee every detail of the installation, ensuring flawless execution and styling that brings your vision to life.',
    activities: [
      'Delivery coordination',
      'Installation management',
      'Furniture placement and styling',
      'Art and accessory curation',
      'Final detail refinement'
    ],
    color: 'from-primary/20 to-primary/10'
  },
  {
    number: '06',
    icon: CheckCircle,
    title: 'Reveal & Support',
    duration: 'Ongoing',
    description: 'The moment you\'ve been waiting for! We unveil your transformed space and provide continued support to ensure your complete satisfaction.',
    activities: [
      'Final walkthrough and reveal',
      'Care and maintenance guidance',
      'Post-installation adjustments',
      'Ongoing design support',
      'Seasonal refresh consultations'
    ],
    color: 'from-accent/30 to-accent/15'
  }
];

export function DesignProcessPage({ onNavigate }: DesignProcessPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Our Signature Process</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            The Design Journey
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From our first conversation to the final reveal, we guide you through a thoughtful, collaborative process designed to bring your dream space to life.
          </p>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">Typical Timeline</h3>
                  <p className="text-muted-foreground">10-16 weeks</p>
                </div>
                <div>
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">Collaborative Approach</h3>
                  <p className="text-muted-foreground">You're involved every step</p>
                </div>
                <div>
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">Personalized Service</h3>
                  <p className="text-muted-foreground">Tailored to your vision</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Steps */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={step.number} className="relative">
                {/* Connector Line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-[23px] md:left-[39px] top-[80px] w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-primary/40 to-primary/10 z-0" />
                )}
                
                <Card className={`relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg ${
                  isEven ? 'md:mr-12' : 'md:ml-12'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50`} />
                  
                  <CardContent className="relative p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon and Number */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-primary/20 relative z-10">
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs z-20">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <h2 className="text-2xl md:text-3xl text-foreground mb-2 md:mb-0">
                            {step.title}
                          </h2>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-sm text-primary border border-primary/20 w-fit">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-primary mb-3">
                            Key Activities
                          </h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {step.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl mb-4">
                Ready to Start Your Design Journey?
              </h2>
              <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                Let's create a space that tells your story. Schedule your complimentary consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('contact')}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Schedule Consultation
                </Button>
                <Button
                  onClick={() => onNavigate('portfolio')}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Our Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
