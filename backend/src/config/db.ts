import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    if (!mongoUri) {
      throw new Error("❌ MONGO_URI manquant dans .env");
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connexion à MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};

export default connectDB;
