import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ConsultationDialog } from '../components/ConsultationDialog';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export function ContactPage() {
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for reaching out! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matched to Portfolio/Services/Process page styling */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-magenta-light/30 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--magenta)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
            <span className="text-sm tracking-wider magenta-gradient-text">✦ LET'S CONNECT ✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-foreground tracking-tight">
            <span className="magenta-gradient-text">Get in Touch</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? We'd love to hear about your vision and discuss how we can
            create something beautiful together. Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-3xl">Start Your Project</CardTitle>
                  <p className="text-muted-foreground">
                    Complete the form below and we'll respond within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="09039330335"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value: string) => setFormData({ ...formData, projectType: value })}
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-home">Full Home Design</SelectItem>
                            <SelectItem value="room-makeover">Room Makeover</SelectItem>
                            <SelectItem value="consultation">Design Consultation</SelectItem>
                            <SelectItem value="e-design">E-Design Services</SelectItem>
                            <SelectItem value="styling">Styling & Staging</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value: string) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-10k">Under $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="over-100k">Over $100,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value: string) => setFormData({ ...formData, timeline: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">As soon as possible</SelectItem>
                            <SelectItem value="1-3months">1-3 months</SelectItem>
                            <SelectItem value="3-6months">3-6 months</SelectItem>
                            <SelectItem value="6months-plus">6+ months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Tell Me About Your Project *</Label>
                      <Textarea
                        id="message"
                        placeholder="Share your vision, style preferences, and any specific requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <p className="text-lg">09039330335 / 07040654539</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <p className="text-lg">Houseoffaridahh@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Address</p>
                      <p className="text-lg">
                        Bolien House, 90 4th Ave<br />
                        Gwarinpa, Abuja 900108<br />
                        Federal Capital Territory
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Office Hours</p>
                      <div className="space-y-1">
                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: By appointment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Follow Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com/houseoffaridah"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow House of Faridah on Instagram"
                      className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://facebook.com/houseoffaridah"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow House of Faridah on Facebook"
                      className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/company/houseoffaridah"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect with House of Faridah on LinkedIn"
                      className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Follow along for design inspiration, behind-the-scenes glimpses, and styling tips!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl mb-3">Complimentary Consultation</h3>
                  <p className="mb-4 opacity-90">
                    Schedule a free 30-minute consultation to discuss your project and explore how we can work together.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowConsultationDialog(true)}
                    className="w-full border-white bg-white text-primary hover:bg-white/90"
                  >
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/30 text-primary mb-8 shadow-lg">
              <span className="text-sm tracking-wider magenta-gradient-text">✦ FAQ ✦</span>
            </div>
            <h2 className="text-4xl sm:text-5xl mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about working together
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">What's your design process like?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  My design process is collaborative and personalized. We start with a consultation to understand your vision, followed by concept development, detailed design, sourcing, and finally installation. Throughout the process, you'll be involved in key decisions while we handle all the details.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Do you work within specific budgets?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We work with various budgets and pride ourselves on creating beautiful spaces regardless of investment level. During our initial consultation, we'll discuss your budget and we'll create a plan that maximizes your investment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">How long does a typical project take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Project timelines vary based on scope. A single room makeover typically takes 4-8 weeks, while full home designs can take 3-6 months. E-design services are usually completed within 2-3 weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Do you offer virtual design services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! Our E-Design services are perfect for clients who prefer remote collaboration or have budget constraints. You'll receive detailed design plans, shopping lists, and implementation guides—all done virtually.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <ConsultationDialog
        open={showConsultationDialog}
        onOpenChange={setShowConsultationDialog}
        serviceType="interiors"
      />
    </div>
  );
}
