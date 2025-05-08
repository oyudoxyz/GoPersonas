import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, SlidersHorizontal, Palette, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Create detailed personas in seconds using advanced artificial intelligence.',
    icon: Brain,
    iconColorClass: 'text-purple-700',
    iconBg: 'bg-gradient-to-br from-purple-400/30 to-indigo-300/20',
    cardBgColor: 'from-purple-600/20 to-indigo-500/10',
    hoverBorderClass: 'group-hover:border-purple-500/50',
    shadow: 'shadow-lg shadow-purple-500/10',
    delay: '0ms',
  },
  {
    title: 'Customizable Traits',
    description: 'Refine and adjust personas to match your specific user research needs.',
    icon: SlidersHorizontal,
    iconColorClass: 'text-pink-700',
    iconBg: 'bg-gradient-to-br from-pink-400/30 to-orange-300/20',
    cardBgColor: 'from-pink-500/20 to-orange-500/10',
    hoverBorderClass: 'group-hover:border-pink-500/50',
    shadow: 'shadow-lg shadow-pink-500/10',
    delay: '100ms',
  },
  {
    title: 'Beautiful Visualizations',
    description: 'Get professionally designed persona cards ready for presentations.',
    icon: Palette,
    iconColorClass: 'text-teal-700',
    iconBg: 'bg-gradient-to-br from-teal-400/30 to-cyan-300/20',
    cardBgColor: 'from-teal-500/20 to-cyan-500/10',
    hoverBorderClass: 'group-hover:border-teal-500/50',
    shadow: 'shadow-lg shadow-teal-500/10',
    delay: '200ms',
  },
  {
    title: 'Export & Share',
    description: 'Download your personas as PDFs or share them directly with your team.',
    icon: Share2,
    iconColorClass: 'text-green-700',
    iconBg: 'bg-gradient-to-br from-green-400/30 to-lime-300/20',
    cardBgColor: 'from-green-500/20 to-lime-500/10',
    hoverBorderClass: 'group-hover:border-green-500/50',
    shadow: 'shadow-lg shadow-green-500/10',
    delay: '300ms',
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background -z-10"></div>
      <div className="absolute inset-0 opacity-30 -z-10" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(128, 90, 213, 0.15) 2%, transparent 0%)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse-slow animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="bg-primary/10 rounded-full py-2 px-4 mb-6 text-primary font-medium text-sm mx-auto w-max shadow-sm">
              <span>Key Features</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Unlock the Power of <span className="gradient-text">AI Personas</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            GoPersonas provides you with cutting-edge tools to understand your users like never before.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="perspective-1000 group"
                style={{ animationDelay: feature.delay }}
              >
                <Card 
                  className={`bg-card/80 backdrop-blur-md h-full p-8 rounded-2xl overflow-hidden transition-all duration-300 relative flex flex-col border-0 ${feature.hoverBorderClass} ${feature.shadow} translate-y-[-6px] rotate-x-[2deg] rotate-y-[-2deg] hover:border-2 hover:shadow-xl hover:translate-y-[-8px] hover:rotate-x-[3deg] hover:rotate-y-[-3deg]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.cardBgColor} opacity-100 -z-10`}></div>
                  
                  <div className={`w-16 h-16 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-md transition-shadow duration-300 group-hover:shadow-lg`}>
                    <IconComponent className={`w-9 h-9 ${feature.iconColorClass}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-grow">{feature.description}</p>
                  
                  <Link to="/generator" className="mt-auto contents">
                    <div className={`mt-auto pt-6 flex items-center font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 ${feature.iconColorClass}`}>
                      <span className="mr-2">Explore Feature</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
