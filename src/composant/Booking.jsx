import { useState, useEffect } from "react";
import Notification from "./Notification";
import { Calendar, Clock, User, Mail, Phone, MessageCircle, X, Scissors, Sparkles } from 'lucide-react';

export default function Booking({ selectedService, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Fonctions de validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) =>
    /^(\+\d{1,3})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/.test(phone);

  const showNotification = (message, type = "success") => {
    setNotification({ isVisible: true, message, type });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        service: selectedService._id
      }));
    }
  }, [selectedService]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/services");
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          showNotification("Impossible de charger les services", "error");
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
        showNotification(
          "Erreur de connexion lors du chargement des services",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace("booking-", "");
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation complète
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      showNotification(
        "Veuillez remplir tous les champs obligatoires",
        "warning"
      );
      return;
    }

    if (!validateEmail(formData.email)) {
      showNotification("Veuillez entrer un email valide", "warning");
      return;
    }

    if (!validatePhone(formData.phone)) {
      showNotification(
        "Veuillez entrer un numéro de téléphone valide",
        "warning"
      );
      return;
    }

    const selectedDate = new Date(formData.date + "T" + formData.time);
    const now = new Date();
    if (selectedDate <= now) {
      showNotification(
        "Veuillez sélectionner une date et heure dans le futur",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedServiceObj = services.find(s => s._id === formData.service);
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedServiceObj?.title || formData.service,
        serviceName: selectedServiceObj?.title || "Service inconnu",
        date: formData.date,
        time: formData.time,
        message: formData.message || "",
      };

      const response = await fetch("http://localhost:3005/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(
          "🎉 Réservation confirmée avec succès ! Nous vous contacterons bientôt.",
          "success"
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
        setTimeout(() => onClose(), 2000);
      } else {
        if (result.details && Array.isArray(result.details)) {
          showNotification(
            `Erreurs de validation: ${result.details.join(", ")}`,
            "error"
          );
        } else if (result.error === "Créneau non disponible") {
          showNotification(
            "❌ Ce créneau horaire est déjà réservé. Veuillez choisir une autre heure.",
            "warning"
          );
        } else {
          showNotification(
            `Erreur: ${result.error || result.message || "Erreur inconnue"}`,
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      showNotification(
        "❌ Erreur de connexion. Vérifiez que le serveur fonctionne.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (loading) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
        <div className="bg-gradient-to-br from-white to-pink-50 p-8 rounded-3xl shadow-2xl border border-pink-100">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            <p className="text-gray-700 font-medium">Chargement des services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={0}
      />

      <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50 p-4">
        <div className="bg-gradient-to-br from-white via-pink-50 to-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border-2 border-pink-100 relative">
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-pink-600 transition-colors duration-200 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>

          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">
              Réserver un service
            </h2>
            <p className="text-gray-600">Remplissez le formulaire pour confirmer votre rendez-vous</p>
          </div>

          {/* Indication du service présélectionné */}
          {selectedService && (
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-2xl p-4 mb-6 flex items-center shadow-sm">
              <div className="bg-pink-500 rounded-xl p-2 mr-3">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-pink-700 font-semibold">Service présélectionné:</span>
                <span className="text-pink-800 ml-2">{selectedService.title}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div className="relative">
                <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="booking-name"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md"
                    required
                    minLength={2}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="booking-email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md ${
                      formData.email && !validateEmail(formData.email)
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200"
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-red-500 text-xs mt-2 ml-1 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    Email invalide
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div className="relative">
                <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Téléphone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="booking-phone"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md ${
                      formData.phone && !validatePhone(formData.phone)
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200"
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formData.phone && !validatePhone(formData.phone) && (
                  <p className="text-red-500 text-xs mt-2 ml-1 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    Format de téléphone invalide
                  </p>
                )}
              </div>

              {/* Service */}
              <div className="relative">
                <label htmlFor="booking-service" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Service *
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <select
                    id="booking-service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md appearance-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title} - {service.price}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="relative">
                <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Date souhaitée *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="booking-date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Heure */}
              <div className="relative">
                <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Heure souhaitée *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="booking-time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md appearance-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Sélectionnez une heure</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message optionnel */}
            <div className="relative">
              <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Message (optionnel)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="booking-message"
                  placeholder="Demandes particulières, première visite, allergies..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm focus:shadow-md resize-none"
                  disabled={isSubmitting}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-1">
                {formData.message.length}/500 caractères
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-pink-700 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Confirmer la réservation</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="border-2 border-gray-300 text-gray-700 bg-white py-3 px-8 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
              >
                Annuler
              </button>
            </div>
          </form>

          <div className="text-xs text-gray-500 mt-6 text-center">
            * Champs obligatoires
          </div>
        </div>
      </div>
    </>
  );
}