import { useState } from "react";
import Accueil from "./composant/Accueil";
import Booking from "./composant/Booking";
import Contact from "./composant/Contact";
import Footer from "./composant/Footer";
import Header from "./composant/Header";
import Services from "./composant/services";
import Prestations from "./composant/Politiques";
import Flyer from "./composant/flyer";

function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showFlyer, setShowFlyer] = useState(false);

  const handleFlyerClose = () => setShowFlyer(!showFlyer);

  const handleBookingClick = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <>
      <Header onBooking={() => setShowBooking(true)} />
      <Accueil onBooking={() => setShowBooking(true)} />
      <Services onBooking={handleBookingClick} 
      setShowFlyer={setShowFlyer} 
      showFlyer={showFlyer}/>
      {showBooking && (
        <Booking
          selectedService={selectedService}
          onClose={() => setShowBooking(false)}
        />
      )}
      {showFlyer && <Flyer onClose={handleFlyerClose} />}
      <Prestations />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
