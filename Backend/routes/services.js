import express from 'express';
import Service from '../Models/service.js'; // Attention: service.js avec 's' minuscule

const router = express.Router();

// GET - Récupérer tous les services
router.get('/', async (req, res) => {
  try {
    console.log("✅ Requête reçue sur GET /api/services");
    const services = await Service.find().sort({ createdAt: -1 });
    console.log(`📊 ${services.length} services trouvés`);
    res.json(services);
  } catch (error) {
    console.error("❌ Erreur récupération services:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

// GET - Récupérer un service par ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    res.json(service);
  } catch (error) {
    console.error("❌ Erreur récupération service:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

// POST - Créer un nouveau service
router.post('/', async (req, res) => {
  try {
    console.log("📝 Création d'un nouveau service:", req.body);
    
    const newService = new Service({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description || ''
    });
    
    const savedService = await newService.save();
    console.log("✅ Service créé:", savedService);
    res.status(201).json(savedService);
  } catch (error) {
    console.error("❌ Erreur création service:", error);
    res.status(400).json({ error: "Erreur serveur", details: error.message });
  }
});

// PUT - Modifier un service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    
    console.log("✅ Service modifié:", updatedService);
    res.json(updatedService);
  } catch (error) {
    console.error("❌ Erreur modification service:", error);
    res.status(400).json({ error: "Erreur serveur", details: error.message });
  }
});

// DELETE - Supprimer un service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    
    if (!deletedService) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    
    console.log("✅ Service supprimé:", deletedService);
    res.json({ message: "Service supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression service:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

export default router;