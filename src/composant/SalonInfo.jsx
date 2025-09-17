export default function SalonInfo() {
  const contactInfo = [
    { emoji: "📍", title: "Adresse", content: "123 Rue de la Beauté\n750 Ottawa, Canada" },
    { emoji: "📞", title: "Téléphone", content: "01 23 45 67 89" },
    { emoji: "✉️", title: "Email", content: "elza@elegance-coiffure.fr" },
    { emoji: "🕒", title: "Horaires", content: "Lun - Ven: 9h00 - 19h00\nSamedi: 9h00 - 18h00\nDimanche: Fermé" },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg h-full border border-pink-100 transform transition-all duration-300 hover:shadow-xl">
      <h3 className="font-playfair text-2xl font-semibold mb-8 text-gray-800 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-pink-400 after:to-transparent">
        Informations du salon
      </h3>
      <div className="space-y-7">
        {contactInfo.map((info, index) => (
          <div 
            key={index} 
            className="flex items-start transition-all duration-300 hover:translate-x-1 group"
          >
            <div className="text-pink-500 text-2xl mr-4 bg-pink-100 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
              {info.emoji}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-lg mb-1">{info.title}</div>
              <div className="text-gray-600 whitespace-pre-line leading-relaxed">{info.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 italic">Nous vous accueillons avec le sourire</p>
      </div>
    </div>
  );
}