import mongoose, { Schema, Document } from 'mongoose';

export interface HeroInterface extends Document {
  _id: mongoose.Types.ObjectId;
  id: number;
  name: string;
  slug: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: string;
    race: string | null;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

const heroSchema = new Schema<HeroInterface>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  powerstats: {
    intelligence: { type: Number },
    strength: { type: Number },
    speed: { type: Number },
    durability: { type: Number },
    power: { type: Number },
    combat: { type: Number },
  },
  appearance: {
    gender: { type: String },
    race: { type: String, default: null },
    height: [{ type: String }],
    weight: [{ type: String }],
    eyeColor: { type: String },
    hairColor: { type: String },
  },
  biography: {
    fullName: { type: String },
    alterEgos: { type: String },
    aliases: [{ type: String }],
    placeOfBirth: { type: String },
    firstAppearance: { type: String },
    publisher: { type: String },
    alignment: { type: String },
  },
  work: {
    occupation: { type: String },
    base: { type: String },
  },
  connections: {
    groupAffiliation: { type: String },
    relatives: { type: String },
  },
  images: {
    xs: { type: String },
    sm: { type: String },
    md: { type: String },
    lg: { type: String },
  },
}, { 
  collection: 'heroes',
  timestamps: true 
});

export default mongoose.model<HeroInterface>('Hero', heroSchema);
