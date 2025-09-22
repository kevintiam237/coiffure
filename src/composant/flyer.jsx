import React from 'react';

export default function Flyer() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transform transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl relative overflow-hidden my-8 md:my-16">
      {/* Éléments décoratifs subtils */}
      <div className="absolute -top-12 -right-12 md:-top-16 md:-right-16 w-32 h-32 md:w-40 md:h-40 rounded-full bg-amber-100/30 blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-28 h-28 md:w-36 md:h-36 rounded-full bg-amber-200/20 blur-xl"></div>
      
      {/* En-tête stylisée pour mobile et desktop */}
      <div className="text-center mb-4 md:mb-6 relative">
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 pb-2 md:pb-3">
          LaBraideuse
          <span className="block text-lg sm:text-xl md:text-2xl font-normal text-amber-700 mt-1 md:mt-2">Coiffure Mobile</span>
        </h2>
        <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10">
        <img 
          src="/flyer.jpg" 
          alt="La Braideuse - Coiffure Mobile" 
          className="w-full h-auto object-contain rounded-lg md:rounded-xl" 
        />
      </div>
    </div>
  );
}