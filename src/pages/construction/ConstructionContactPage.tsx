import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ConsultationDialog } from '../../components/ConsultationDialog';
import { EnquiryForm } from '../../components/EnquiryForm';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { addressLines, phoneNumbers } from '../../lib/format';

export function ConstructionContactPage() {
  const config = useSiteConfig();

  // "0903… / 0704…" shows as Main / Alternate; the second number is also the emergency line.
  const phones = phoneNumbers(config.contactPhone);
  const phoneDetails = phones.map((p, i) => (i === 0 ? `Main: ${p}` : i === 1 ? `Alternate: ${p}` : `Also: ${p}`));
  const emergencyPhone = phones[1] ?? phones[0];
  const officeLines = addressLines(config.contactAddress);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: phoneDetails,
      action: 'Call Us'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [config.contactEmail],
      action: 'Email Us'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: officeLines,
      action: 'Get Directions'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 7am - 6pm', 'Saturday: 8am - 2pm'],
      action: 'Schedule Visit'
    }
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
              {config.tallyConstructionFormId && (
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed quote and project timeline.
                </p>
              )}

              <EnquiryForm
                formId={config.tallyConstructionFormId}
                formTitle="Construction enquiry form"
                noFormHeading="Call or email us to request a quote"
                noFormIntro="We'll get back to you within 24 hours with a detailed quote and project timeline."
              />
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-foreground to-foreground/90 text-background border-0">
                <CardContent className="p-8">
                  <Building2 className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1">Free Consultation & Quote</p>
                        <p className="text-sm text-background/80">No obligation, detailed project assessment</p>
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
                  <strong className="text-foreground">Emergency Services:</strong> For urgent construction issues or emergencies, please call our 24/7 emergency line at {emergencyPhone}.
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
                {officeLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
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
                  Project costs vary greatly depending on size, scope, materials, and location. We provide free detailed quotes after assessing your specific needs.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
}
