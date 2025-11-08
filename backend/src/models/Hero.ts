import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  alias: { type: String },
  univers: { type: String, enum: ['Marvel', 'DC', 'Autre'], required: true },
  pouvoirs: { type: [String], default: [] },
  description: { type: String },
  image: { type: String },
  origine: { type: String },
  premiereApparition: { type: String }
}, {
  timestamps: true // ajoute createdAt et updatedAt
});

export default mongoose.model('Hero', heroSchema);
