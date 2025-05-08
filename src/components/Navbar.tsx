import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UsersRound, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 py-4 px-6 relative">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center text-white">
            <UsersRound className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">GoPersonas</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
          <Link to="/generator" className="text-foreground/70 hover:text-foreground transition-colors">Generator</Link>
          <Link to="/examples" className="text-foreground/70 hover:text-foreground transition-colors">Examples</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="default" className="hidden md:flex bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity">
            <Link to="/generator">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 bg-background border-t border-border">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors block py-2" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/generator" className="text-foreground/80 hover:text-foreground transition-colors block py-2" onClick={toggleMobileMenu}>Generator</Link>
            <Link to="/examples" className="text-foreground/80 hover:text-foreground transition-colors block py-2" onClick={toggleMobileMenu}>Examples</Link>
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition-opacity">
              <Link to="/generator" onClick={toggleMobileMenu}>Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
