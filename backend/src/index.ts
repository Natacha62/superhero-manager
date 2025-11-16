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

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ✅ Sert tout le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'images')));


app.use('/api/auth', authRoutes);
app.use('/api/heroes', heroRoutes);

app.get('/', (req, res) => {
  res.send('🚀 SuperHeroManager API est en ligne');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Erreur non gérée :', err.message);
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
