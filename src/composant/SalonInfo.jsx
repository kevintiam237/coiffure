export default function SalonInfo() {
  const contactInfo = [
    {
      emoji: "📅",
      title: "Réservation",
      content:
        "Planning en ligne sécurisé\nConfirmation définitive après dépot de 25$CAD Rappel automatique la veille"
    },
    {
      emoji: "🕒",
      title: "Disponibilités",
      content: "Du mardi au dimanche, 24 h/24\nInterventions sur créneaux fixes ou urgences"
    },
    {
      emoji: "📍",
      title: "Zone d’intervention",
      content: "Toute la région d’Ottawa et ses environs\nDéplacement inclus, sans supplément"
    },
    {
      emoji: "✅",
      title: "Modalités",
      content: "Devis gratuit avant validation\nSolde réglé sur place : carte, espèce ou e-Transfer"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-amber-100 rounded-2xl p-8 shadow-2xl h-full border border-amber-200 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
      {/* Élément décoratif */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-200/30 blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-amber-300/20 blur-xl"></div>
      
      <h3 className="font-playfair text-3xl font-bold mb-10 text-amber-900 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-amber-500 after:to-transparent">
        Informations de service
      </h3>
      
      <div className="space-y-8 relative z-10">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-start transition-all duration-300 hover:translate-x-2 group"
          >
            <div className="text-amber-600 text-2xl mr-5 bg-gradient-to-br from-amber-100 to-amber-200 p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md group-hover:from-amber-200 group-hover:to-amber-300">
              {info.emoji}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-amber-800 text-lg mb-2 tracking-wide">{info.title}</div>
              <div className="text-amber-700/90 whitespace-pre-line leading-relaxed font-light">{info.content}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-7 border-t border-amber-200/60 text-center">
        <p className="text-sm text-amber-700/80 italic font-light">
          Matériel professionnel transporté sur site – respect des normes d’hygiène les plus strictes
        </p>
      </div>
    </div>
  );
}