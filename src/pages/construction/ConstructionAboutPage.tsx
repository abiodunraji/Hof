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
  TrendingUp,
  CheckCircle,
  HardHat,
  Wrench,
  ClipboardCheck
} from 'lucide-react';

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

const team = [
  {
    name: 'Michael Thompson',
    role: 'Founder & CEO',
    specialty: 'Project Management',
    icon: HardHat,
    description: '25+ years of construction experience, leading projects from concept to completion.'
  },
  {
    name: 'Sarah Martinez',
    role: 'Chief Operating Officer',
    specialty: 'Operations & Safety',
    icon: ClipboardCheck,
    description: 'Ensures operational excellence and maintains our industry-leading safety record.'
  },
  {
    name: 'David Chen',
    role: 'Lead Engineer',
    specialty: 'Structural Engineering',
    icon: Wrench,
    description: 'Expert in structural design and innovative construction solutions.'
  }
];

const milestones = [
  { year: '2010', title: 'Company Founded', description: 'Started with a vision to deliver exceptional construction services' },
  { year: '2013', title: 'First Major Commercial Project', description: 'Completed 50,000 sq ft office complex' },
  { year: '2016', title: 'Expanded Services', description: 'Added renovation and restoration division' },
  { year: '2019', title: 'Sustainability Certification', description: 'Achieved LEED certification for green building' },
  { year: '2022', title: '500th Project Milestone', description: 'Celebrated completion of our 500th successful project' },
  { year: '2025', title: 'Industry Recognition', description: 'Awarded Regional Builder of the Year' }
];

export function ConstructionAboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/portfolio/construction/site-work/site-work-06.jpg"
            alt="HOF Construction Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-background mb-6">
            Building Excellence Since 2010
          </h1>
          <p className="text-xl text-background/90 max-w-3xl mx-auto">
            With over 15 years of experience and 500+ completed projects, we're proud to be your trusted construction partner.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  HOF Construction was founded in 2010 with a simple mission: to deliver exceptional construction services that exceed client expectations. What started as a small team of passionate builders has grown into a full-service construction company known for quality, reliability, and innovation.
                </p>
                <p>
                  Over the years, we've had the privilege of working on diverse projects ranging from custom residential homes to large-scale commercial developments. Each project has reinforced our commitment to craftsmanship, safety, and client satisfaction.
                </p>
                <p>
                  Today, we're proud to employ a team of over 50 skilled professionals who share our dedication to building excellence. Our success is measured not just in structures completed, but in the lasting relationships we've built with our clients and community.
                </p>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="/portfolio/construction/site-work/site-work-14.jpg"
                alt="HOF Construction Workers"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
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

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-10 h-10 text-foreground" />
                    </div>
                    <h3 className="text-xl mb-1">{member.name}</h3>
                    <p className="text-foreground/70 mb-2">{member.role}</p>
                    <p className="text-sm text-primary mb-4">{member.specialty}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth and success
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-start group">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl text-foreground group-hover:text-foreground/70 transition-colors">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-foreground group-hover:scale-125 transition-transform" />
                  {index < milestones.length - 1 && (
                    <div className="absolute left-1/2 top-4 w-0.5 h-[calc(100%+2rem)] bg-foreground/20 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Certifications & Credentials</h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              Fully licensed, insured, and certified to serve you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>State Licensed General Contractor</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>OSHA Safety Certified</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>LEED Accredited Professional</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>Fully Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>EPA Lead-Safe Certified</span>
            </div>
            <div className="flex items-center gap-3 bg-background/10 p-6 rounded-lg">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>Better Business Bureau A+ Rating</span>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link to="/construction/contact">Work With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
