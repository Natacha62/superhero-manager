import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const filePath = path.join(__dirname, '../SuperHerosComplet.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const heroes = JSON.parse(rawData);

    await Hero.deleteMany(); // Nettoyage
    await Hero.insertMany(heroes); // Import

    console.log(`✅ ${heroes.length} héros importés avec succès`);
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’import :', error);
    process.exit(1);
  }
};

importData();
