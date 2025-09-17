import { useState } from "react";
import { sendContactMessage } from "../utils/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      await sendContactMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.log(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100">
      <h3 className="font-playfair text-2xl font-semibold mb-8 text-gray-800 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-pink-400 after:to-transparent">
        Nous contacter
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            Nom complet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md pl-10"
            placeholder="Votre nom complet"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-7">
            <span className="text-gray-400">👤</span>
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md pl-10"
            placeholder="votre@email.com"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-7">
            <span className="text-gray-400">📧</span>
          </div>
        </div>

        {/* Téléphone */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md pl-10"
            placeholder="01 23 45 67 89"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-7">
            <span className="text-gray-400">📞</span>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            Message *
          </label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            placeholder="Décrivez-nous votre demande..."
          />
        </div>

        {/* Statut */}
        {status === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm flex items-center animate-fadeIn">
            <span className="text-green-500 text-lg mr-2">✅</span>
            <span>Message envoyé avec succès ! Nous vous répondrons rapidement.</span>
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm flex items-center animate-fadeIn">
            <span className="text-red-500 text-lg mr-2">❌</span>
            <span>Une erreur est survenue. Veuillez vérifier les champs ou réessayer.</span>
          </div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 px-4 rounded-xl hover:from-pink-700 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <span className="mr-2">✉️</span>
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