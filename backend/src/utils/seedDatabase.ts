import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';

dotenv.config();

const importData = async () => {
  try {
    // 🔌 Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/superheroes');
    console.log('✅ Connexion à MongoDB réussie');

    // 📁 Lecture du fichier JSON
    const filePath = path.join(__dirname, '../uploads/SuperHerosComplet.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    // ✅ Accès au tableau "superheros"
    const rawHeroes = parsedData.superheros;
    if (!Array.isArray(rawHeroes)) {
      throw new Error('Le fichier JSON ne contient pas un tableau "superheros" valide.');
    }

    // 🔁 Transformation des données
    const heroes = rawHeroes.map((hero: any) => ({
      id: hero.id,
      name: hero.name,
      slug: hero.slug,
      powerstats: hero.powerstats,
      appearance: hero.appearance,
      biography: hero.biography,
      work: hero.work,
      connections: hero.connections,
      images: hero.images,
    }));

    // 🧹 Nettoyage de la collection
    await Hero.deleteMany({});
    console.log('🧹 Collection heroes nettoyée');

    // 📥 Insertion dans MongoDB
    await Hero.insertMany(heroes);
    console.log(`✅ ${heroes.length} héros importés avec succès`);

    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’import :', error);
    process.exit(1);
  }
};

importData();
