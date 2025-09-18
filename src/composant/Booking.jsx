import { useState, useEffect } from "react";
import Notification from "./Notification";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  X,
  Sparkles,
  Home,
  Zap,
} from "lucide-react";

export default function Booking({ selectedService, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
    isExpress: false,
    address: "",
  });

  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Validation
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
        service: selectedService._id,
      }));
    }
  }, [selectedService]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
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
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace("booking-", "");

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        isExpress: value === "oui",
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [fieldName]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.service ||
      !formData.date ||
      !formData.time ||
      !formData.address
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
      const selectedServiceObj = services.find(
        (s) => s._id === formData.service
      );
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedServiceObj?.title || formData.service,
        serviceName: selectedServiceObj?.title || "Service inconnu",
        date: formData.date,
        time: formData.time,
        message: formData.message || "",
        isHomeService: true,
        isExpress: formData.isExpress,
        address: formData.address,
      };

      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(
          "🎉 Réservation confirmée ! Nous vous contacterons bientôt.",
          "success"
        );
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            date: "",
            time: "",
            message: "",
            isExpress: false,
            address: "",
          });
          onClose();
        }, 2000);
      } else {
        if (result.details && Array.isArray(result.details)) {
          showNotification(
            `Erreurs: ${result.details.join(", ")}`,
            "error"
          );
        } else if (result.error === "Créneau non disponible") {
          showNotification(
            "Ce créneau est déjà pris. Veuillez choisir une autre heure.",
            "warning"
          );
        } else {
          showNotification(`Erreur: ${result.error || result.message}`, "error");
        }
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      showNotification(
        "Erreur de connexion au serveur. Veuillez réessayer.",
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
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-amber-100">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-gray-700 font-medium">Chargement...</p>
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
        duration={5000}
      />

      <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50 p-4">
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-amber-200 relative">
          {/* Bouton fermeture */}
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-5 right-5 text-gray-500 hover:text-amber-600 transition-colors z-10 bg-white/80 rounded-full p-2 shadow-md hover:shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-2">
              Réserver un rendez-vous
            </h2>
            <p className="text-amber-700">Tous nos services sont réalisés à votre domicile.</p>
          </div>

          {/* Service présélectionné */}
          {selectedService && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center shadow-sm">
              <div className="bg-amber-500 rounded-xl p-2 mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-amber-700 font-semibold">Service:</span>
                <span className="text-amber-800 ml-2">{selectedService.title}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div className="relative">
                <label htmlFor="booking-name" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                  <input
                    type="text"
                    id="booking-name"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 shadow-sm transition-all"
                    required
                    minLength={2}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="booking-email" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                  <input
                    type="email"
                    id="booking-email"
                    placeholder="jean@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-11 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm transition-all ${
                      formData.email && !validateEmail(formData.email)
                        ? "border-red-300 focus:ring-red-500"
                        : "border-amber-200"
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-red-500 text-xs mt-1 ml-1">📧 Email invalide</p>
                )}
              </div>

              {/* Téléphone */}
              <div className="relative">
                <label htmlFor="booking-phone" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Téléphone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                  <input
                    type="tel"
                    id="booking-phone"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`pl-11 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm transition-all ${
                      formData.phone && !validatePhone(formData.phone)
                        ? "border-red-300 focus:ring-red-500"
                        : "border-amber-200"
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formData.phone && !validatePhone(formData.phone) && (
                  <p className="text-red-500 text-xs mt-1 ml-1">📞 Format invalide</p>
                )}
              </div>

              {/* Service */}
              <div className="relative">
                <label htmlFor="booking-service" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Service *
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none z-10" />
                  <select
                    id="booking-service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm appearance-none transition-all"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Choisir un service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title} — {service.price}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="relative">
                <label htmlFor="booking-date" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                  <input
                    type="date"
                    id="booking-date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Heure */}
              <div className="relative">
                <label htmlFor="booking-time" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Heure *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
                  <select
                    id="booking-time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm appearance-none transition-all"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Choisir une heure</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div className="md:col-span-2">
                <label htmlFor="booking-address" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                  Adresse complète *
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-amber-400 pointer-events-none" />
                  <input
                    type="text"
                    id="booking-address"
                    placeholder="Numéro, rue, ville, code postal"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Option Express */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-sm">
              <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Service express ?
              </h3>
              <p className="text-sm text-amber-700 mb-4">
                Optez pour un service accéléré (tarif majoré). Disponible selon disponibilités.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="express"
                    value="oui"
                    checked={formData.isExpress === true}
                    onChange={handleInputChange}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.isExpress === true
                        ? "border-orange-500 bg-orange-500"
                        : "border-amber-300 group-hover:border-orange-300"
                    }`}
                  >
                    {formData.isExpress === true && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span
                    className={`${
                      formData.isExpress === true
                        ? "text-orange-600 font-medium"
                        : "text-amber-800"
                    } transition-colors`}
                  >
                    Oui, service express
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="express"
                    value="non"
                    checked={formData.isExpress === false}
                    onChange={handleInputChange}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.isExpress === false
                        ? "border-orange-500 bg-orange-500"
                        : "border-amber-300 group-hover:border-orange-300"
                    }`}
                  >
                    {formData.isExpress === false && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span
                    className={`${
                      formData.isExpress === false
                        ? "text-orange-600 font-medium"
                        : "text-amber-800"
                    } transition-colors`}
                  >
                    Non, service standard
                  </span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="booking-message" className="block text-sm font-medium text-amber-800 mb-2 ml-1">
                Message (optionnel)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-amber-400 pointer-events-none" />
                <textarea
                  id="booking-message"
                  placeholder="Ex: Première visite, allergies, préférences..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="pl-11 pr-4 py-3 w-full border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/80 shadow-sm resize-none transition-all"
                  disabled={isSubmitting}
                />
              </div>
              <p className="text-xs text-amber-600 mt-1 ml-1">
                {formData.message.length}/500
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-8 rounded-2xl font-semibold flex items-center justify-center gap-2 min-w-48 transition-all ${
                  isSubmitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-amber-600 hover:to-orange-700 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Envoi...</span>
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
                className="border-2 border-amber-300 text-amber-700 bg-white/80 py-3 px-8 rounded-2xl font-semibold hover:border-amber-400 hover:bg-amber-50 transition-all disabled:opacity-50"
              >
                Annuler
              </button>
            </div>

            <div className="text-xs text-amber-600 text-center mt-4">
              * Champs obligatoires • Tous les services sont effectués à domicile
            </div>
          </form>
        </div>
      </div>
    </>
  );
}