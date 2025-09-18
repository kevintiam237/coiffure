import React from "react";
import { Calendar, Star, Sparkles, Scissors, Heart, ChevronDown } from "lucide-react";

export default function Accueil({ onBooking }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 pt-24 flex items-center relative overflow-hidden"
    >
      {/* Décorations dorées animées */}
      <div className="absolute top-10 left-10 opacity-20 animate-[float_8s_ease-in-out_infinite]">
        <Scissors size={100} className="text-amber-500 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-[float_10s_ease-in-out_infinite] delay-1000">
        <Heart size={90} className="text-amber-500 drop-shadow-lg" />
      </div>
      <div className="absolute top-1/3 left-20 opacity-15 animate-pulse">
        <Sparkles size={80} className="text-amber-400" />
      </div>
      <div className="absolute bottom-1/4 right-20 opacity-15 animate-pulse delay-500">
        <Star size={80} className="text-amber-400" />
      </div>

      {/* Cercles dorés flottants */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-2 border-amber-400/20 animate-[float_12s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-2 border-amber-400/20 animate-[float_14s_ease-in-out_infinite] delay-700"></div>

      {/* Shimmer doré */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent animate-[shimmer_3s_infinite] -skew-x-12"></div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center">
          {/* Logo animé */}
          <div className="animate-[float_6s_ease-in-out_infinite] inline-flex items-center justify-center w-36 h-36 bg-gradient-to-br from-white to-amber-50 rounded-full shadow-2xl mb-10 border-4 border-amber-300/50 relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img src="/logo.png" alt="logo" className="rounded-full w-36 h-36 object-cover" />
            <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Titre principal */}
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight tracking-tight">
            Sublimez votre beauté avec{" "}
            <span className="relative bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              La Braideuse
              <Sparkles className="absolute -top-6 -right-10 w-8 h-8 text-amber-400 animate-pulse" />
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-amber-800 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Coiffure premium à domicile, sur rendez-vous. Confort, expertise et discrétion garantis.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={onBooking}
              className="relative bg-gradient-to-br from-amber-500 to-amber-700 text-white px-12 py-5 rounded-3xl text-lg font-semibold shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group overflow-hidden"
            >
              <Calendar className="w-6 h-6" />
              <span>Réserver maintenant</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-12 scale-125"></div>
            </button>

            <button
              onClick={() => scrollTo('services')}
              className="border-2 border-amber-500 text-amber-700 bg-white/80 px-12 py-5 rounded-3xl text-lg font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-4 group"
            >
              <Star className="w-6 h-6 transition-transform group-hover:rotate-12" />
              <span>Nos services</span>
            </button>
          </div>

          {/* Indicateur de scroll */}
          <div
            className="animate-bounce cursor-pointer"
            onClick={() => scrollTo('services')}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-amber-400 hover:bg-amber-50 transition-all duration-300">
              <ChevronDown className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Animations custom */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}