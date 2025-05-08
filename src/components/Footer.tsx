import React from 'react';
import { Link } from 'react-router-dom';
import { UsersRound } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-card/70 dark:bg-background py-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(128, 90, 213, 0.8) 2%, transparent 0%)', 
        backgroundSize: '30px 30px',
        transform: 'rotate(45deg)'
      }}></div>
      
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white">
              <UsersRound className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">GoPersonas</span>
          </Link>
          
          {/* Tagline */}
          <p className="text-sm text-foreground/60 max-w-md text-center mb-8">
            Transforming product development with AI-powered persona generation technology.
          </p>
          
          {/* Subtle divider */}
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-30 mb-8"></div>
          
          {/* Copyright */}
          <div className="text-center text-foreground/60">
            <p className="text-sm">© {new Date().getFullYear()} GoPersonas. All rights reserved.</p>
            <p className="text-xs mt-2 text-foreground/40">
              Powered by AI. Designed for Humans.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
