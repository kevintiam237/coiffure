import React, { useEffect, useState } from "react";

export default function Services({ onBooking, showFlyer,setShowFlyer }) {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [displayedServices, setDisplayedServices] = useState(6);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServicesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
    setDisplayedServices(showAll ? 6 : servicesData.length);
  };

  const servicesToShow = showAll ? servicesData : servicesData.slice(0, displayedServices);

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-amber-50 to-amber-100 relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">          
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            Nos Prestations
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
          </h2>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto mt-8 leading-relaxed">
            Découvrez notre gamme complète de services réalisés par des experts 
            pour sublimer votre beauté naturelle
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
              <p className="text-gray-500">Chargement des prestations...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesToShow.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full group relative"
                >
                  {/* Conteneur d'image avec effet de survol */}
                  <div className="relative overflow-hidden">
                    <div className="h-80 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {service.description || "Service professionnel avec des produits de haute qualité"}
                    </p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-amber-600 font-bold text-2xl">
                        {service.price}
                      </div>
                      <button 
                        onClick={() => onBooking(service)}
                        className="relative overflow-hidden bg-white text-amber-500 cursor-pointer hover:text-white font-medium py-2 px-2 rounded-full transition-all duration-300 border border-amber-500 text-sm group-hover:bg-amber-500"
                      >
                        <span className="relative z-10">Réserver</span>
                        <div className="absolute inset-0 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bouton pour voir plus/moins de services */}
            {servicesData.length > 6 && (
              <div className="text-center mt-16">
                <button 
                  onClick={handleShowAll}
                  className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-2xl transform hover:-translate-y-1 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {showAll ? "Voir moins de services" : "Voir tous les services"}
                    <svg 
                      className={`ml-2 h-5 w-5 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-1"}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                {/* Indicateur du nombre de services affichés */}
                <p className="text-gray-500 text-sm mt-4">
                  {showAll 
                    ? `Affichage de tous les ${servicesData.length} services` 
                    : `Affichage de ${Math.min(6, servicesData.length)} sur ${servicesData.length} services`
                  }
                </p>
              </div>
            )}
            
            <div className="text-center mt-12">
              <a 
                className="inline-flex cursor-pointer items-center text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300 group"
                onClick={() => setShowFlyer(!showFlyer)}
    >
      {showFlyer ? 'Fermer le flyer' : 'En savoir plus sur les services' }
                <svg 
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}