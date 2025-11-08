import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// ✅ Inscription
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Nom d’utilisateur déjà utilisé' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      passwordHash,
      role,
      createdAt: new Date()
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!,
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
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Connexion
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
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
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Vérification du token
export const verifyUserToken = (req: Request & { user?: { id?: string; username?: string; role?: string } }, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json({ message: 'Token valide', user });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
