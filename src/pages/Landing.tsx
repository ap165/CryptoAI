import type React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, FileText, MessageSquare, Shield } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Landing: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-md' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight">CryptoAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-text-secondary hover:text-primary transition-colors font-medium">
                Login
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="md" className="rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] -z-10 mix-blend-screen opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-text-primary to-text-secondary bg-clip-text text-transparent">
            Your AI-Powered <br className="hidden md:block" /> Knowledge Assistant
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            A smart knowledge base where employees can ask questions about internal company policies and procedures. Get instant, accurate answers powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="rounded-full px-8 py-4 text-lg">
                Start Using CryptoAI
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-4 text-lg border-border hover:border-primary/50 text-text-primary">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Knowledge Discovery</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Powered by cutting-edge AI to help employees find answers from company policies and documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Document Search</h3>
              <p className="text-text-secondary leading-relaxed">
                Instantly search and analyze internal company policies, procedures, and documentation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group delay-100">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <FileText className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Policy Insights</h3>
              <p className="text-text-secondary leading-relaxed">
                Access accurate answers and data-driven insights directly from your company's internal knowledge base.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group delay-200">
              <div className="w-14 h-14 rounded-full bg-positive/10 flex items-center justify-center mb-6 group-hover:bg-positive/20 transition-colors">
                <MessageSquare className="w-7 h-7 text-positive" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conversational Research</h3>
              <p className="text-text-secondary leading-relaxed">
                Research any internal topic through natural conversation. Ask questions and get detailed, accurate answers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group delay-300">
              <div className="w-14 h-14 rounded-full bg-primary-light/10 flex items-center justify-center mb-6 group-hover:bg-primary-light/20 transition-colors">
                <Shield className="w-7 h-7 text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Insights</h3>
              <p className="text-text-secondary leading-relaxed">
                Receive tailored insights based on your interests and questions, powered by contextual AI understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-primary/5 to-surface/0 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-10">
            Join thousands of employees using AI-powered knowledge intelligence
          </p>
          <Link to="/signup">
            <Button variant="primary" size="lg" className="rounded-full px-10 py-5 text-lg shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.7)] transition-shadow">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/50 border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl">CryptoAI</span>
              </div>
              <p className="text-text-muted max-w-sm">
                Advanced artificial intelligence for internal knowledge discovery, policy research, and personalized assistance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-text-primary">Product</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">AI Chat</Link></li>
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-text-primary">Company</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">About</Link></li>
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="#" className="text-text-muted hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-text-muted text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CryptoAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-text-muted hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="#" className="text-text-muted hover:text-primary transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
