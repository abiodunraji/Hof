import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Award, Heart, Sparkles, Star, Users, Home } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Passion for Beauty',
    description: 'Every project is infused with love and attention to detail, creating spaces that truly inspire.',
  },
  {
    icon: Sparkles,
    title: 'Timeless Elegance',
    description: 'I believe in designs that transcend trends, focusing on classic beauty that lasts.',
  },
  {
    icon: Users,
    title: 'Client-Centered',
    description: 'Your vision, your story, your home. I listen deeply to create spaces uniquely yours.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'Commitment to the highest quality in every aspect, from concept to completion.',
  },
];

const achievements = [
  { icon: Home, value: '500+', label: 'Homes Transformed' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Heart, value: '1000+', label: 'Happy Clients' },
  { icon: Sparkles, value: '50+', label: 'Design Awards' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 bg-gradient-to-b from-gold-light/20 via-secondary/30 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-md rounded-full mb-6 border border-primary/30 shadow-md">
                <p className="text-sm tracking-widest gold-gradient-text">✦ FOUNDER & LEAD DESIGNER ✦</p>
              </div>
              <h1 className="text-5xl sm:text-6xl mb-6">
                <span className="gold-gradient-text">Meet Faridah</span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-transparent mb-8" />
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                A passionate interior designer dedicated to creating spaces that nurture the soul
                and celebrate the beauty of everyday life.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-gold-dark hover:from-primary/90 hover:to-gold-dark/90 shadow-lg border border-gold/20"
              >
                <Link to="/interiors/contact">Start Your Project</Link>
              </Button>
            </div>

            <div className="relative decorative-corner">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl luxe-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758817864979-56da98f34f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBkZXNpZ25lcnxlbnwxfHx8fDE3NjExMjk3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Faridah - Interior Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                <p className="italic text-muted-foreground">
                  "Design is not just what it looks like. It's how it makes you feel."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="my-story" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-8 text-center">My Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              My journey into interior design began over 15 years ago, fueled by a deep love for
              creating beautiful, harmonious spaces. I've always believed that our homes are more
              than just places to live—they're sanctuaries where we grow, create memories, and
              find peace.
            </p>
            <p>
              After completing my degree in Interior Design from the prestigious Design Institute,
              I spent years working with luxury design firms, honing my craft and developing my
              unique aesthetic. In 2015, I founded House of Faridah with a clear vision: to bring
              personalized, elegant design to homes and create spaces that truly reflect the souls
              who inhabit them.
            </p>
            <p>
              What sets my approach apart is the deep connection I build with each client. I don't
              just design rooms; I listen to your stories, understand your dreams, and translate
              them into spaces that feel authentically yours. Every color choice, every texture,
              every piece of furniture is carefully selected to create harmony and beauty.
            </p>
            <p>
              Today, I'm grateful to have transformed over 500 homes, each one a unique expression
              of the people who live there. Whether it's a cozy apartment or a grand family home,
              I approach every project with the same passion and dedication to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl mb-4">My Design Philosophy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The core values that guide every project I undertake
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white border-primary/20">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl mb-4">Achievements & Milestones</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A testament to years of dedication and passion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-4">
                  <achievement.icon size={32} />
                </div>
                <div className="text-4xl sm:text-5xl mb-2 text-primary">{achievement.value}</div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workspace Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669975103152-207f84d2b272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEwODI3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Design workspace"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl mb-6">My Creative Process</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Discovery & Connection</h3>
                    <p className="text-muted-foreground">
                      We begin with an in-depth conversation about your vision, lifestyle, and dreams for your space.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Concept Development</h3>
                    <p className="text-muted-foreground">
                      I create mood boards and design concepts that capture the essence of your unique style.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Detailed Design</h3>
                    <p className="text-muted-foreground">
                      Every element is carefully selected and planned, from color palettes to furniture pieces.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Transformation</h3>
                    <p className="text-muted-foreground">
                      I oversee every detail of the implementation to ensure your vision comes to life perfectly.
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
          <h2 className="text-4xl sm:text-5xl mb-6">Let's Create Something Beautiful Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to transform your space into a reflection of your unique story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white text-primary hover:bg-white/90"
            >
              <Link to="/interiors/contact">Get in Touch</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-outline-white"
            >
              <Link to="/interiors/portfolio">View My Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
