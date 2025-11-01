import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { ConsultationDialog } from '../../components/ConsultationDialog';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Building2,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

interface ConstructionContactPageProps {
  onNavigate: (page: string) => void;
}

export function ConstructionContactPage({ onNavigate }: ConstructionContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your inquiry! We\'ll contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['Main: 09039330335', 'Alternate: 07040654539'],
      action: 'Call Us'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['Houseoffaridahh@gmail.com'],
      action: 'Email Us'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Bolien House, 90 4th Ave', 'Gwarinpa, Abuja 900108', 'Federal Capital Territory'],
      action: 'Get Directions'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 7am - 6pm', 'Saturday: 8am - 2pm'],
      action: 'Schedule Visit'
    }
  ];

  const projectTypes = [
    'Residential Construction',
    'Commercial Building',
    'Renovation/Addition',
    'Multi-Family Development',
    'Industrial/Warehouse',
    'Other'
  ];

  const budgetRanges = [
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    'Over $5M',
    'Not Sure Yet'
  ];

  const timelineOptions = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Over 1 year',
    'Just exploring'
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 to-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-foreground text-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Let's Build Together
          </h1>
          <p className="text-xl text-background/90 max-w-3xl mx-auto">
            Ready to start your construction project? Contact us today for a free consultation and quote. We're here to answer your questions and bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">Request a Quote</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote and project timeline.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="09039330335"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select project type...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="timeline">Desired Timeline</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select timeline...</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project... What are you looking to build? Any specific requirements or goals?"
                    className="mt-1.5"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </form>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-foreground to-foreground/90 text-background border-0">
                <CardContent className="p-8">
                  <Building2 className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl mb-4">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">Free Consultation & Quote</p>
                        <p className="text-sm text-background/80">No obligation, detailed project assessment</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">Licensed & Insured</p>
                        <p className="text-sm text-background/80">Fully certified with comprehensive coverage</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">Quality Guarantee</p>
                        <p className="text-sm text-background/80">We stand behind our work with warranties</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">Transparent Pricing</p>
                        <p className="text-sm text-background/80">Detailed quotes with no hidden costs</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">On-Time Delivery</p>
                        <p className="text-sm text-background/80">Proven track record of meeting deadlines</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl mb-4">What Happens Next?</h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <p className="mb-1">Initial Response</p>
                        <p className="text-sm text-muted-foreground">We'll contact you within 24 hours to discuss your project</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <p className="mb-1">Site Visit & Assessment</p>
                        <p className="text-sm text-muted-foreground">We'll schedule a visit to evaluate the project scope</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                        3
                      </div>
                      <div>
                        <p className="mb-1">Detailed Proposal</p>
                        <p className="text-sm text-muted-foreground">Receive a comprehensive quote and timeline</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                        4
                      </div>
                      <div>
                        <p className="mb-1">Project Kickoff</p>
                        <p className="text-sm text-muted-foreground">Once approved, we begin bringing your vision to life</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <div className="bg-muted/50 p-6 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Emergency Services:</strong> For urgent construction issues or emergencies, please call our 24/7 emergency line at 07040654539.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Visit Our Office</h2>
            <p className="text-xl text-muted-foreground">
              Stop by for a consultation or to discuss your project in person
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Bolien House, 90 4th Ave</p>
                <p>Gwarinpa, Abuja 900108</p>
                <p>Federal Capital Territory</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2">How much does a construction project cost?</h3>
                <p className="text-muted-foreground">
                  Project costs vary greatly depending on size, scope, materials, and location. We provide free detailed quotes after assessing your specific needs. Our projects typically range from $100K for renovations to $5M+ for large commercial builds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2">How long does a typical project take?</h3>
                <p className="text-muted-foreground">
                  Timeline depends on project complexity. Residential homes typically take 12-18 months, commercial buildings 12-24 months, and renovations 3-12 months. We provide detailed schedules during the proposal phase.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2">Do you handle permits and inspections?</h3>
                <p className="text-muted-foreground">
                  Yes! We handle all necessary permits, approvals, and inspections. Our team is experienced in working with local building departments and ensures full compliance with all regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2">What areas do you serve?</h3>
                <p className="text-muted-foreground">
                  We serve the greater metropolitan area and surrounding regions within 50 miles of our office. For larger projects, we're willing to travel further. Contact us to discuss your location.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
