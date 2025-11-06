import { 
  MessageSquare, 
  Lightbulb, 
  Users, 
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const processSteps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Share Your Vision',
    subtitle: 'Documentation & Brief',
    duration: '1-2 days',
    description: 'Begin your transformation by sharing your space with us. Upload photos, videos, or CAD files alongside your budget and timeline to help us craft a realistic project scope that aligns with your dreams.',
    keyActivities: 'Review & Assessment',
    activities: [
      'Photo and video upload portal',
      'CAD file analysis (if available)', 
      'Budget alignment discussion',
      'Timeline planning session',
      'Space measurement verification',
      'Initial brief documentation'
    ],
    color: 'from-blue-500/20 to-blue-600/10',
    highlight: 'Upload & Plan'
  },
  {
    number: '02', 
    icon: Users,
    title: 'Expert Site Visit',
    subtitle: 'On-Location Discovery',
    duration: '1 day',
    description: 'Our expert design team visits your space for an immersive consultation. We explore possibilities together, understand your lifestyle needs, and align our creative vision with your expectations.',
    keyActivities: 'Ideate & Explore',
    activities: [
      'Comprehensive site assessment',
      'Lifestyle and needs exploration',
      'Design possibility mapping',
      'Spatial relationship analysis',
      'Material and lighting evaluation',
      'Vision alignment workshop'
    ],
    color: 'from-emerald-500/20 to-emerald-600/10',
    highlight: 'Discover & Connect'
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Design Development',
    subtitle: 'Concept & Quotation',
    duration: '1-2 weeks',
    description: 'Following your site visit, we provide a retainership invoice that unlocks our creative process. Once confirmed, receive a tailored moodboard and detailed quotation after approving the concept design.',
    keyActivities: 'Quote & Visualize',
    activities: [
      'Retainership agreement setup',
      'Custom moodboard creation',
      'Concept design development',
      'Material palette curation',
      'Detailed project quotation',
      'Design presentation session'
    ],
    color: 'from-amber-500/20 to-amber-600/10',
    highlight: 'Create & Propose'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Project Launch',
    subtitle: 'Implementation & Delivery',
    duration: '4-8 weeks',
    description: 'Once the bill of quantity is delivered and payment confirmed, our transformation begins immediately. Watch your space evolve as our team executes every detail with precision and care.',
    keyActivities: 'Launch & Transform',
    activities: [
      'Bill of quantity finalization',
      'Payment processing & confirmation',
      'Project timeline activation',
      'Vendor coordination & sourcing',
      'Installation management',
      'Final styling & completion'
    ],
    color: 'from-purple-500/20 to-purple-600/10',
    highlight: 'Execute & Deliver'
  }
];

export function DesignProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-gold-light/30 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm tracking-wider gold-gradient-text">✦ OUR SIGNATURE PROCESS ✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-foreground tracking-tight">
            <span className="gold-gradient-text">The Design Journey</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
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
                  <p className="text-muted-foreground">4-12 weeks</p>
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
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-cta-white-to-gold shadow-lg border-0"
                >
                  <Link to="/interiors/contact">Schedule Consultation</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-gold-dark text-white hover:from-amber-300 hover:to-gold border-0 shadow-lg"
                >
                  <Link to="/interiors/portfolio">View Our Portfolio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
