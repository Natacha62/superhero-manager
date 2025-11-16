import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// 🔐 Inscription
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  console.log("📥 Données reçues register:", req.body);

  try {
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const allowedRoles = ['admin', 'editor', 'user'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Nom d’utilisateur déjà utilisé' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, role });
    await newUser.save();

    console.log("🔑 JWT_SECRET utilisé:", process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Configuration serveur invalide (JWT)' });
    }

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error('❌ Erreur serveur register:', error.message, error.stack);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔐 Connexion
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("📥 Données reçues login:", req.body);

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Nom d’utilisateur et mot de passe requis' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    console.log("🔑 JWT_SECRET utilisé:", process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Configuration serveur invalide (JWT)' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('❌ Erreur serveur login:', error.message, error.stack);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔍 Vérification du token
export const verifyUserToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  console.log("📥 Header reçu verify:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("🔑 JWT_SECRET utilisé:", process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Configuration serveur invalide (JWT)' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token valide', user: decoded });
  } catch (error: any) {
    console.error('❌ Erreur serveur verify:', error.message);
    res.status(403).json({ message: 'Token invalide ou expiré', error: error.message });
  }
};
