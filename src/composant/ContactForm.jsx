import { useState } from "react";
import { sendContactMessage } from "../utils/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Validation simple
    if (!formData.name || !formData.email || !formData.message || !formData.address) {
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      await sendContactMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
    } catch (err) {
      console.log(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-amber-100 rounded-2xl p-8 shadow-2xl border border-amber-200 transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-200/30 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-amber-300/20 blur-xl"></div>
      
      <h3 className="font-playfair text-3xl font-bold mb-10 text-amber-900 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-amber-500 after:to-transparent">
        Nous contacter
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
        {/* Nom */}
        <div className="relative">
          <label className="block text-sm font-medium text-amber-800 mb-2 ml-1 tracking-wide">
            Nom complet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white/80 shadow-sm focus:shadow-md pl-12 focus:bg-white hover:border-amber-300"
            placeholder="Votre nom complet"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none mt-7">
            <span className="text-amber-500 text-lg">👤</span>
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-amber-800 mb-2 ml-1 tracking-wide">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white/80 shadow-sm focus:shadow-md pl-12 focus:bg-white hover:border-amber-300"
            placeholder="votre@email.com"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none mt-7">
            <span className="text-amber-500 text-lg">📧</span>
          </div>
        </div>

        {/* Téléphone */}
        <div className="relative">
          <label className="block text-sm font-medium text-amber-800 mb-2 ml-1 tracking-wide">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white/80 shadow-sm focus:shadow-md pl-12 focus:bg-white hover:border-amber-300"
            placeholder="01 23 45 67 89"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none mt-7">
            <span className="text-amber-500 text-lg">📞</span>
          </div>
        </div>

        {/* Adresse */}
        <div className="relative">
          <label className="block text-sm font-medium text-amber-800 mb-2 ml-1 tracking-wide">
            Adresse de prestation *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white/80 shadow-sm focus:shadow-md pl-12 focus:bg-white hover:border-amber-300"
            placeholder="Votre adresse complète"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none mt-7">
            <span className="text-amber-500 text-lg">🏠</span>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2 ml-1 tracking-wide">
            Message *
          </label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white/80 shadow-sm focus:shadow-md focus:bg-white hover:border-amber-300"
            placeholder="Décrivez-nous votre demande de service..."
          />
        </div>

        {/* Statut */}
        {status === "success" && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-green-800 text-sm flex items-center animate-fadeIn">
            <span className="bg-green-500 text-white p-1.5 rounded-full mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
            <span>Message envoyé avec succès ! Nous vous répondrons rapidement.</span>
          </div>
        )}
        {status === "error" && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 text-red-800 text-sm flex items-center animate-fadeIn">
            <span className="bg-red-500 text-white p-1.5 rounded-full mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
            <span>Veuillez remplir tous les champs obligatoires (*).</span>
          </div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 px-6 rounded-xl hover:from-amber-700 hover:to-amber-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center font-medium tracking-wide group"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              <span className="mr-2 transition-transform duration-300 group-hover:scale-110">✉️</span>
              Envoyer le message
            </>
          )}
        </button>
      </form>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        input:focus, textarea:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}