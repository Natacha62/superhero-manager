import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import heroRoutes from './routes/heroRoutes';

dotenv.config();
connectDB();

const app = express();

// Middlewares globaux
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// ✅ Sert les fichiers statiques depuis src/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'images')));


// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/heroes', heroRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('🚀 SuperHeroManager API est en ligne');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
