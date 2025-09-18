import { useState } from "react";
import Accueil from "./composant/Accueil";
import Booking from "./composant/Booking";
import Contact from "./composant/Contact";
import Footer from "./composant/Footer";
import Header from "./composant/Header";
import Services from "./composant/services";
import Prestations from "./composant/Politiques";


function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookingClick = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <>
      <Header onBooking={() => setShowBooking(true)} />
      <Accueil onBooking={() => setShowBooking(true)}/>
      <Services onBooking={handleBookingClick} />
      {showBooking && (
        <Booking
          selectedService={selectedService}
          onClose={() => setShowBooking(false)}
        />
      )}
      <Prestations/>
      <Contact />
      <Footer />
    </>
  );
}

export default App;