import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Award, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="h-16 w-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to SkillForge
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              AI-Driven Adaptive Learning & Exam Generator
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
              Transform your learning experience with intelligent assessments, 
              personalized feedback, and automated certificate generation
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for modern learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Smart Assessments',
                description: 'Create and take exams with intelligent question banks and auto-grading',
              },
              {
                icon: Award,
                title: 'Auto Certificates',
                description: 'Earn certificates automatically when you score 90% or above',
              },
              {
                icon: TrendingUp,
                title: 'Adaptive Learning',
                description: 'Track progress and get personalized recommendations',
              },
              {
                icon: Users,
                title: 'Leaderboards',
                description: 'Compete with peers and track top performers',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-secondary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of students and teachers already using SkillForge
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6"
          >
            Start Learning Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 SkillForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
