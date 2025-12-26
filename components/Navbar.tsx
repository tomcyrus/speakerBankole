import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

type Page = 'landing' | 'masterclass' | 'contact' | 'resources' | 'about' | 'app';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  activePage?: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks: { label: string; value: Page }[] = [
    { label: 'Home', value: 'landing' },
    { label: 'About Me', value: 'about' },
    { label: 'Masterclasses', value: 'masterclass' },
    { label: 'Resources', value: 'resources' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer z-50 relative"
            onClick={() => {
                onNavigate('landing');
                setIsOpen(false);
            }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="text-black font-serif italic font-bold text-lg">B</span>
          </div>
          <span className="hidden sm:inline-block text-zinc-900">Speaker Bankole</span>
          <span className="sm:hidden text-zinc-900">SB</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          {navLinks.map((link) => (
             <button 
               key={link.value}
               onClick={() => onNavigate(link.value)} 
               className={`transition-colors hover:text-amber-600 ${activePage === link.value ? 'text-amber-600 font-semibold' : ''}`}
             >
               {link.label}
             </button>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
            <Button 
                onClick={() => onNavigate('masterclass')} 
                className="hidden md:flex rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10"
            >
                Reserve Spot
            </Button>
            
            <button 
                className="md:hidden z-50 relative text-zinc-900 p-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
          <div className="flex flex-col gap-8 text-center text-xl font-medium text-zinc-900 w-full px-8">
            {navLinks.map((link) => (
                <button 
                key={link.value}
                onClick={() => {
                    onNavigate(link.value);
                    setIsOpen(false);
                }} 
                className={`py-2 transition-colors hover:text-amber-600 ${activePage === link.value ? 'text-amber-600' : ''}`}
                >
                {link.label}
                </button>
            ))}
            <div className="h-px w-full bg-zinc-100 my-2"></div>
            <Button 
                onClick={() => {
                    onNavigate('masterclass');
                    setIsOpen(false);
                }} 
                className="w-full rounded-full py-4 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10 text-lg"
            >
                Reserve Your Spot
            </Button>
          </div>
      </div>
    </nav>
  );
};