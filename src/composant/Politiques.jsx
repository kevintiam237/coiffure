import { Calendar, CheckCircle, Clock, DollarSign, Droplet } from 'lucide-react';

export default function Politique() {
  return (
    <section id="politique" className="bg-gradient-to-b from-amber-50 via-white to-orange-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Politique de Service
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Grille des modalités */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Prise de rendez-vous */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prise de rendez-vous</h2>
                <p className="text-gray-600 leading-relaxed">
                  Un dépôt non remboursable de <strong>20$CAD</strong> est requis pour confirmer toute réservation. Ce montant sera déduit du prix final le jour de votre prestation.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirmation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Un rappel est envoyé par message dans les 24h avant le rendez-vous. En l’absence de réponse, celui-ci sera annulé sans remboursement de l’acompte.
                </p>
              </div>
            </div>
          </div>

          {/* Annulations & modifications */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Annulations & modifications</h2>
                <p className="text-gray-600 leading-relaxed">
                  Toute modification ou annulation doit être faite <strong>au moins 24h à l’avance</strong> pour un remboursement complet :
                  <br />
                  • Si vous annulez : report possible ou remboursement  
                  • Si nous annulons : remboursement intégral automatique
                </p>
              </div>
            </div>
          </div>

          {/* Frais supplémentaires */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Frais de soirée</h2>
                <p className="text-gray-600 leading-relaxed">
                  Des frais supplémentaires de <strong>30$CAD</strong> s’appliquent aux rendez-vous pris entre <strong>20h00 et 4h00</strong>, en raison de la disponibilité exceptionnelle.
                </p>
              </div>
            </div>
          </div>

          {/* Hygiène */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300 md:col-span-2">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Droplet className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Préparation requise</h2>
                <p className="text-gray-600 leading-relaxed">
                  Pour garantir un résultat optimal, merci de vous présenter avec les cheveux <strong>proprement lavés, démêlés et sans produits</strong>. Cela permet à notre experte de se concentrer sur la coiffure, pas sur le nettoyage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message final - Ton chaleureux et professionnel */}
        <div className="mt-14 text-center bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 max-w-3xl mx-auto shadow-inner">
          <p className="text-gray-700 italic text-lg leading-relaxed">
            "Chaque détail compte. Votre confort, votre temps et votre beauté méritent le meilleur. 
            Merci de votre confiance — à très vite chez vous, pour un moment de soin et d’élégance."
          </p>
          <p className="text-amber-700 font-semibold mt-3">— Elza, La Braideuse</p>
        </div>
      </div>
    </section>
  );
}