import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez fournir un email valide'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis'],
    trim: true,
    match: [
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      'Veuillez fournir un numéro de téléphone français valide'
    ]
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Le service est requis']
  },
  serviceName: {
    type: String,
    required: [true, 'Le nom du service est requis'],
    trim: true
  },
  servicePrice: {
    type: String,
    required: [true, 'Le prix du service est requis'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'La date de rendez-vous est requise'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'La date doit être dans le futur'
    }
  },
  time: {
    type: String,
    required: [true, 'L\'heure est requise'],
    trim: true,
    match: [
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Veuillez fournir une heure valide (HH:MM)'
    ]
  },
  message: {
    type: String,
    default: '',
    trim: true,
    maxlength: [500, 'Le message ne peut pas dépasser 500 caractères']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'cancelled', 'completed'],
      message: 'Le statut doit être: pending, confirmed, cancelled, ou completed'
    },
    default: 'pending'
  },
  notes: {
    type: String,
    default: '',
    trim: true,
    maxlength: [1000, 'Les notes ne peuvent pas dépasser 1000 caractères']
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Index pour améliorer les performances de recherche
bookingSchema.index({ email: 1 });
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ service: 1 });

// Méthode virtuelle pour obtenir le nom complet formaté
bookingSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Méthode pour vérifier si la réservation est dans le futur
bookingSchema.methods.isFuture = function() {
  const bookingDateTime = new Date(`${this.date.toDateString()} ${this.time}`);
  return bookingDateTime > new Date();
};

// Méthode pour annuler une réservation
bookingSchema.methods.cancel = function() {
  this.status = 'cancelled';
  return this.save();
};

// Méthode pour confirmer une réservation
bookingSchema.methods.confirm = function() {
  this.status = 'confirmed';
  return this.save();
};

// Hook pre-save pour valider que la combinaison date/heure n'existe pas déjà
bookingSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('date') || this.isModified('time')) {
    const existingBooking = await this.constructor.findOne({
      date: this.date,
      time: this.time,
      status: { $in: ['pending', 'confirmed'] },
      _id: { $ne: this._id }
    });
    
    if (existingBooking) {
      const error = new Error('Ce créneau est déjà réservé');
      error.name = 'ValidationError';
      return next(error);
    }
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);