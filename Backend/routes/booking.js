import express from 'express';
import Booking from '../Models/Booking.js';

const router = express.Router();

// GET - Récupérer toutes les réservations
router.get('/', async (req, res) => {
  try {
    console.log("✅ Requête reçue sur GET /api/bookings");
    const bookings = await Booking.find().sort({ createdAt: -1 });
    console.log(`📊 ${bookings.length} réservations trouvées`);
    res.json(bookings);
  } catch (error) {
    console.error("❌ Erreur récupération bookings:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

// POST - Créer une nouvelle réservation
router.post('/', async (req, res) => {
  try {
    console.log("📝 Création d'une nouvelle réservation:", req.body);
    
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    
    console.log("✅ Réservation créée:", savedBooking);
    res.status(201).json({
      message: "Réservation créée avec succès",
      booking: savedBooking
    });
    
  } catch (error) {
    console.error("❌ Erreur création booking:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: "Erreur de validation",
        details: errors
      });
    }
    
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

export default router;