import React from "react";
import { FaTiktok } from "react-icons/fa";
import {
  Heart,
  Instagram,
  Calendar,
  Clock,
  Scissors,
  Sparkles,
  Home,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/labraideuse", color: "hover:text-amber-500" },
  ];

  const contactInfo = [
    { icon: Calendar, text: "Réservation en ligne ou via DM", url: "#booking" },
    { icon: Clock, text: "Mar–dim, 24 h sur rendez-vous", url: "#" },
  ];

  const quickLinks = [
    { name: "Nos services", url: "#services" },
    { name: "Politique de service", url: "#policy" },
    { name: "Nous contacter", url: "#contact" },
  ];

  return (
    <footer className="relative items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-amber-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 justify-center">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-full shadow-lg">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
                La Braideuse
              </h3>
            </div>
            <p className="text-amber-200 mb-6 leading-relaxed">
              Coiffure haut de gamme à domicile. Expertise, raffinement et confort réunis chez vous.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`bg-amber-800/50 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-amber-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xl mb-4 flex items-center text-amber-100">
              <Home className="w-5 h-5 text-amber-400 mr-2" />
              Service à domicile
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-start space-x-3 text-amber-200 hover:text-amber-100 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Liens */}
          <div>
            <h4 className="font-semibold text-xl mb-4 flex items-center text-amber-100">
              <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
              À découvrir
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-amber-200 hover:text-amber-100 transition-all duration-300 transform hover:translate-x-2 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-amber-700/50 pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-amber-300">
            <p className="flex items-center">
              © {currentYear} La Braideuse. Tous droits réservés.
              <Heart className="w-4 h-4 text-amber-400 fill-current mx-1 animate-pulse" />
            </p>
            <div className="flex items-center space-x-6">
              <span>Coiffure mobile • Ottawa</span>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                <span className="text-amber-400 font-medium">À votre domicile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Éléments flottants */}
      <div className="absolute bottom-20 left-10 opacity-10">
        <Scissors size={60} className="text-amber-400" />
      </div>
      <div className="absolute top-20 right-10 opacity-10">
        <Heart size={60} className="text-orange-400" />
      </div>
    </footer>
  );
}