import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './authMiddleware';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès interdit' });
      }
      next();
    });
  };
};
