import React from 'react';
import { Calendar, Star, Award, Sparkles, Scissors, Heart, ChevronDown } from "lucide-react";

export default function Accueil({ onBooking }) {
  const handleServicesClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const offset = 100; // Compensation pour la hauteur du header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => {
    const element = document.getElementById('services');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="accueil" className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 flex items-center relative overflow-hidden">
      {/* Éléments décoratifs subtils */}
      <div className="absolute top-20 left-10 opacity-5 transform rotate-12">
        <Scissors size={80} />
      </div>
      <div className="absolute bottom-40 right-15 opacity-5 transform -rotate-15">
        <Heart size={80} />
      </div>
      <div className="absolute top-1/3 left-20 opacity-5">
        <Sparkles size={70} />
      </div>
      <div className="absolute bottom-1/4 right-25 opacity-5">
        <Star size={70} />
      </div>
      
      {/* Background pattern très subtil */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZjY4YjgiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTAiLz48L2c+PC9zdmc+')]"></div>
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center">
          {/* En-tête avec badge */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-6 py-3 mb-12 shadow-lg border border-pink-100 transform hover:scale-105 transition-transform duration-300">
            <Award className="w-6 h-6 text-pink-600 mr-3" />
            <span className="text-base font-semibold text-gray-800">Salon d'excellence 2024</span>
            <div className="ml-3 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Icône animée */}
          <div className="animate-[float_6s_ease-in-out_infinite] inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-white to-pink-50 rounded-full shadow-xl mb-8 border-2 border-pink-100">
            <span className="text-5xl">💇‍♀️</span>
          </div>
          
          {/* Titre principal */}
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            L'élégance à votre <span className="relative bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
              image
              <Sparkles className="absolute -top-4 -right-8 w-7 h-7 text-pink-400 animate-pulse" />
            </span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Découvrez l'expertise de nos coiffeuse passionnées pour une transformation 
            qui sublime votre beauté naturelle dans une ambiance luxueuse et détendue.
          </p>

          {/* Points forts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Scissors className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Expertise</h3>
              <p className="text-gray-600">Coiffeuse certifiées avec plus de 10 ans d'expérience</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Qualité</h3>
              <p className="text-gray-600">Produits premium et techniques de pointe</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Bien-être</h3>
              <p className="text-gray-600">Moment de détente et de relaxation absolue</p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <button 
              onClick={onBooking}
              className="relative bg-gradient-to-r from-pink-600 to-pink-500 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Réserver maintenant
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={handleServicesClick}
              className="border-2 border-pink-600 text-pink-600 bg-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
            >
              <Star className="w-6 h-6" />
              Découvrir nos services
            </button>
          </div>

          {/* Indicateur de défilement */}
          <div className="animate-bounce absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={scrollToNext}>
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200">
              <ChevronDown className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}