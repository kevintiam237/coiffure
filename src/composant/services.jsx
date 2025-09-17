import React, { useEffect, useState } from "react";

export default function Services({ onBooking }) {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [displayedServices, setDisplayedServices] = useState(6); // Afficher 6 services par défaut

  useEffect(() => {
    fetch("http://localhost:3005/api/services")
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

  // Services à afficher
  const servicesToShow = showAll ? servicesData : servicesData.slice(0, displayedServices);

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-pink-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec design amélioré */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            Nos Prestations
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Découvrez notre gamme complète de services réalisés par des experts 
            pour sublimer votre beauté naturelle
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesToShow.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full group"
                >
                  {/* Conteneur d'image avec effet de survol */}
                  <div className="relative overflow-hidden">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-sm bg-pink-500 px-3 py-1 rounded-full">
                          {service.duration || "45 min"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {service.description || "Service professionnel avec des produits de haute qualité"}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-pink-600 font-bold text-2xl">
                        {service.price}
                      </div>
                      <button 
                        onClick={() => onBooking(service)}
                        className="text-pink-500 cursor-pointer hover:text-white hover:bg-pink-500 font-medium py-2 px-4 rounded-full transition-all duration-300 border border-pink-500 text-sm"
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bouton pour voir plus/moins de services */}
            {servicesData.length > 6 && (
              <div className="text-center mt-16">
                <button 
                  onClick={handleShowAll}
                  className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 hover:from-pink-600 hover:to-pink-700 hover:shadow-2xl transform hover:-translate-y-1 group overflow-hidden"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          </>
        )}
      </div>

      <style jsx>{`
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}