import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Service from "./Models/service.js";

const uri = "mongodb+srv://kevintiam:CamerounCanada@coiffure.k2iv4f8.mongodb.net/?retryWrites=true&w=majority&appName=coiffure";

const services = [
  { title: "Alicia Braids", price: "À partir de 80 $CAD", imageUrl: "/image/alicia_braids.jpeg" },
  { title: "Boho Braids", price: "À partir de 85 $CAD", imageUrl: "/image/boho_braids.jpeg" },
  { title: "Boho French", price: "À partir de 90 $CAD", imageUrl: "/image/boho_french.jpeg" },
  { title: "Braided Twist", price: "À partir de 75 $CAD", imageUrl: "/image/braided_twist.jpeg" },
  { title: "Bubble Braids", price: "À partir de 70 $CAD", imageUrl: "/image/bubble_braids.jpeg" },
  { title: "Butterfly Locs", price: "À partir de 95 $CAD", imageUrl: "/image/butterfly_locs.jpeg" },
  { title: "Coiffure Enfant", price: "À partir de 40 $CAD", imageUrl: "/image/enfant.jpeg" },
  { title: "Fulani Braids", price: "À partir de 85 $CAD", imageUrl: "/image/fulani_braids.jpeg" },
  { title: "Haircut", price: "À partir de 45 $CAD", imageUrl: "/image/haircut.jpeg" },
  { title: "Half Braids", price: "À partir de 80 $CAD", imageUrl: "/image/half_braids.jpeg" },
  { title: "Coiffure Homme", price: "À partir de 35 $CAD", imageUrl: "/image/homme.jpeg" },
  { title: "Invisible Locs", price: "À partir de 100 $CAD", imageUrl: "/image/invisible_locs.jpeg" },
  { title: "Knotless Braids", price: "À partir de 90 $CAD", imageUrl: "/image/knotless.jpeg" },
  { title: "Pose Lace", price: "À partir de 120 $CAD", imageUrl: "/image/Pose_lace.jpeg" },
  { title: "Twist Braids", price: "À partir de 75 $CAD", imageUrl: "/image/twist_braids.jpeg" }
];

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  await Service.deleteMany(); // Nettoie la collection
  await Service.insertMany(services); // Insère les nouveaux services
  console.log('✅ Services insérés avec les prix en $CAD');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Erreur de connexion ou d’insertion :', err);
});