import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors({
  origin: "https://elgancecoiffure-six.vercel.app"
}));

app.use(express.json());
app.use(express.static("public"));

// ==================== Connexion MongoDB ====================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur MongoDB:", error.message);
    process.exit(1);
  }
};

// ==================== Modèle Service ====================
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

// ==================== Routes ====================

// GET /api/services → Récupérer tous les services
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Erreur lors du fetch des services :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/reservation → Réception d'une réservation
app.post("/api/reservation", async (req, res) => {
  const { name, email, phone, service, date, time, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: "Nouvelle réservation",
    text: `
      📩 Réservation reçue :

      - Nom : ${name}
      - Email : ${email}
      - Téléphone : ${phone}
      - Service : ${service}
      - Date : ${date}
      - Heure : ${time}
      - Message : ${message || "Aucun message"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email :", error);
    res.status(500).json({ error: "Échec de l’envoi de l’email" });
  }
});

// POST /api/contact → Message général depuis le formulaire de contact
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: "📬 Nouveau message de contact",
    text: `
      Nom : ${name}
      Email : ${email}
      Téléphone : ${phone}
      Message : ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur lors de l’envoi du message :", error);
    res.status(500).json({ error: "Échec de l’envoi du message" });
  }
});

// ==================== Démarrage du serveur ====================
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
};

startServer();