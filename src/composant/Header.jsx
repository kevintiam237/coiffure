import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors, Phone, Sparkles, Calendar, Crown } from 'lucide-react';

// Définition des éléments de menu
const menuItems = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Contact' }
];

export default function Header({ onBooking }) {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    // Scroll vers la section
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Hauteur augmentée du header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' 
        : 'bg-gradient-to-r from-white to-pink-50/90 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <div className="flex justify-between items-center">
          
          {/* Logo avec taille augmentée */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-3 bg-pink-200 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 p-2.5 rounded-full shadow-lg">
                <Scissors className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-playfair text-3xl font-bold bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent leading-tight">
                Elza Coiffure
              </h1>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500 font-light">Ottawa</span>
              </div>
            </div>
          </div>

          {/* Navigation Desktop avec texte plus grand */}
          <nav className="hidden md:flex ml-12 items-center space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative px-5 py-3 text-lg font-medium transition-all duration-300 group ${
                  activeSection === item.id 
                    ? 'text-pink-600' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-pink-600 rounded-full"></div>
                )}
                <div className="absolute inset-0 bg-pink-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            ))}
          </nav>

          {/* Bouton Réserver Desktop plus grand */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={onBooking}
              className="relative bg-gradient-to-r from-pink-600 to-pink-500 text-white px-8 py-3.5 rounded-2xl text-lg font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 group overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-3 cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Prendre RDV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-white/20 rounded-2xl transform rotate-12 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Bouton Menu Mobile plus grand */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-3.5 rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 transition-all duration-300 relative shadow-md hover:shadow-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
              {!isMobileMenuOpen && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu Mobile avec taille augmentée */}
      <div 
        className={`md:hidden bg-white/98 backdrop-blur-xl border-t border-pink-100 transition-all duration-500 ease-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pt-2' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pt-3 pb-7 space-y-3">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`block px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:translate-x-3 ${
                activeSection === item.id 
                  ? 'text-pink-700 bg-gradient-to-r from-pink-50 to-pink-100 shadow-md' 
                  : 'text-gray-700 hover:text-pink-700 hover:bg-pink-50'
              }`}
            >
              <div className="flex items-center">
                {activeSection === item.id && (
                  <div className="w-2.5 h-2.5 bg-pink-600 rounded-full mr-3"></div>
                )}
                {item.label}
              </div>
            </a>
          ))}
          <button 
            onClick={onBooking}
            className="w-full cursor-pointer text-center px-5 py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-2xl mt-4 text-lg font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
          >
            <Calendar className="w-6 h-6" />
            <span>Prendre RDV</span>
          </button>
        </div>
      </div>

      {/* Indicateur de section active pour mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-400 to-pink-600"></div>
      )}
    </header>
  );
}