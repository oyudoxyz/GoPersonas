import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 animated-gradient-bg bg-gradient-to-b from-background via-purple-50/30 to-background/90 dark:from-background dark:via-purple-900/10 dark:to-background/95"></div>
      <div className="absolute inset-0 -z-10 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(128, 90, 213, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(128, 90, 213, 0.1) 2%, transparent 0%)', backgroundSize: '100px 100px' }}></div>
      
      <div className="animate-fade-in max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Create <span className="gradient-text">AI-Powered</span> User Personas in Seconds
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Transform your product development with advanced AI personas that bring your users to life using microsoft/phi-4-reasoning-plus technology.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity text-lg py-6 px-8">
            <Link to="/generator">Generate AI Personas</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-2 text-lg py-6 px-8 border-border hover:bg-accent hover:text-accent-foreground">
            <Link to="/examples">View Examples</Link>
          </Button>
        </div>
      </div>
      
      {/* Enhanced 3D Hero Image - glass panel removed */}
      <div className="w-full max-w-5xl mt-16 animate-fade-in relative z-10" style={{ animationDelay: '0.2s' }}>
        <div className="relative perspective-1000 mx-auto" style={{ maxWidth: '63%' }}>
          <div className="w-full h-full relative animate-rotate-y-6 preserve-3d shadow-2xl rounded-2xl overflow-hidden border-4 border-white/10 bg-card">
            {/* Top Highlight Effect */}
            <div className="absolute inset-0 opacity-80 bg-gradient-to-b from-purple-500/10 to-transparent z-10 pointer-events-none"></div>
            
            {/* Card Content */}
            <img 
              src="/lovable-uploads/Persona1CasualReaderClara.svg" 
              alt="Persona Example" 
              className="w-full rounded-2xl"
            />
          </div>
          
          {/* Floating decoration elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
