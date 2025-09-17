import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

const serviceSchema = new mongoose.Schema({
  title: String,
  price: String,
  imageUrl: String,
  description: String
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const services = await Service.find();
    res.status(200).json(services);
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}