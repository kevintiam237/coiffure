import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, Crown, Scissors, Phone, Gem } from 'lucide-react';

const menuItems = [
  { id: 'accueil', label: 'Accueil', icon: Crown },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'politique', label: 'Politique', icon: Gem },
  { id: 'contact', label: 'Contact', icon: Phone }
];

export default function Header({ onBooking }) {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-2xl py-3 border-b border-amber-300/30' 
        : 'bg-white/50 backdrop-blur-md py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">

          {/* Logo Luxe */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleNavClick('accueil')}>
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-1 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg border border-amber-300/50">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-amber-200">
                  <img src="/logo.png" alt="Logo La Braideuse" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-playfair text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
                La Braideuse
              </h1>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                <span className="text-xs text-amber-800 tracking-widest">OTTAWA</span>
              </div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative px-5 py-3 rounded-xl text-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    activeSection === item.id 
                      ? 'text-amber-900 bg-gradient-to-r from-amber-200/50 to-amber-300/30 shadow-md border border-amber-300/30' 
                      : 'text-amber-800 hover:text-amber-900 hover:bg-amber-200/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Bouton Réserver */}
          <div className="hidden md:flex">
            <button
              onClick={onBooking}
              className="relative bg-gradient-to-br from-amber-500 to-amber-700 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-3 group overflow-hidden"
            >
              <Calendar className="w-5 h-5" />
              <span>Prendre RDV</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-12 scale-125"></div>
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-2xl bg-white/70 text-amber-700 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden transition-all duration-500 ease-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="mx-6 mb-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/50 p-4 space-y-2 shadow-xl">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-amber-900 bg-gradient-to-r from-amber-200/40 to-amber-300/20 shadow-sm' 
                    : 'text-amber-800 hover:bg-amber-200/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <button
            onClick={onBooking}
            className="w-full mt-3 bg-gradient-to-br from-amber-500 to-amber-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Calendar className="w-5 h-5" />
            <span>Prendre RDV</span>
          </button>
        </div>
      </div>
    </header>
  );
}