import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; role: string; username?: string };
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];
  try {
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET manquant dans .env");
      return res.status(500).json({ message: "Configuration serveur invalide (JWT)" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; role: string; username?: string };
    req.user = decoded;
    next();
  } catch (err: any) {
    console.error("❌ Erreur vérification token:", err.message);
    return res.status(403).json({ message: "Token invalide ou expiré", error: err.message });
  }
};
