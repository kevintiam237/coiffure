import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err);
  });