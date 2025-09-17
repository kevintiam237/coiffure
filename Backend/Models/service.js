import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Le prix est requis'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'L\'image est requise'],
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Service', serviceSchema);