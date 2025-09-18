import ContactForm from "./ContactForm.jsx";
import SalonInfo from "./SalonInfo.jsx";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-white via-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4">Nous Contacter</h2>
          <p className="text-gray-600 text-lg">Réservez votre prestation à domicile ou contactez-nous pour plus d'informations</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <SalonInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}