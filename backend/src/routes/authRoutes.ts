import express from 'express';

import{
    registerUser,
    loginUser,
    verifyUserToken
} from '../controllers/authController';

import {verifyToken} from '../middleware/authMiddleware';

const router = express.Router();

// 🔓 Inscription et connexion
router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔐 Vérification du token (utilisé pour garder l'utilisateur connecté)
router.get('/verify', verifyToken, verifyUserToken);

export default router;