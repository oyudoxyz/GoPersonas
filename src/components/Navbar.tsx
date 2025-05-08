import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 py-4 px-6 relative">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">G</div>
          <span className="text-xl font-bold">GoPersonas</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
          <Link to="/generator" className="text-foreground/70 hover:text-foreground transition-colors">Generator</Link>
          <Link to="/examples" className="text-foreground/70 hover:text-foreground transition-colors">Examples</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity">
            <Link to="/generator">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
