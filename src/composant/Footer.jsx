import React from 'react';
import { Heart, Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, Scissors, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-500' },
  ];

  const contactInfo = [
    { icon: MapPin, text: '123 Rue de la Beauté, 350 Ottawa', url: '#' },
    { icon: Phone, text: '01 23 45 67 89', url: 'tel:+165189562' },
    { icon: Mail, text: 'contact@elegance-coiffure.fr', url: 'mailto:elza@elegance-coiffure.fr' },
    { icon: Clock, text: 'Lun-Sam: 9h-19h | Dim: Fermé', url: '#' },
  ];

  const quickLinks = [
    { name: 'Nos Services', url: '#services' },
    { name: 'Galerie', url: '#galerie' },
    { name: 'À Propos', url: '#about' },
    { name: 'Contact', url: '#contact' },
    { name: 'Politique de Confidentialité', url: '#' },
    { name: 'Conditions d\'Utilisation', url: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2.5 rounded-full shadow-lg">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
                Élégance Coiffure
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre salon de coiffure d'exception à Ottawa. Nous sublimons votre beauté naturelle avec expertise et passion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`bg-gray-700/50 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-white flex items-center">
              <Sparkles className="w-5 h-5 text-pink-400 mr-2" />
              Nous Contacter
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-start space-x-3 text-gray-300 hover:text-pink-300 transition-colors duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-white flex items-center">
              <Sparkles className="w-5 h-5 text-pink-400 mr-2" />
              Liens Rapides
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-300 hover:text-pink-300 transition-all duration-300 transform hover:translate-x-2 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-xl mb-6 text-white flex items-center">
              <Sparkles className="w-5 h-5 text-pink-400 mr-2" />
              Restez Informé
            </h4>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous pour recevoir nos offres exclusives et actualités.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              © {currentYear} Elza Coiffure. Tous droits réservés.
              <Heart className="w-4 h-4 text-pink-400 fill-current mx-1 animate-pulse" />
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Conçu avec passion</span>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></span>
                <span className="text-pink-400">Ottawa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-20 left-10 opacity-10">
        <Scissors size={40} />
      </div>
      <div className="absolute top-20 right-10 opacity-10">
        <Heart size={40} />
      </div>
    </footer>
  );
}