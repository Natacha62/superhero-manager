import express from 'express';
import{
    getHeroes,
    getHeroById,
    createHero,
    updateHero,
    deleteHero
} from '../controllers/heroController';

import {verifyToken} from '../middleware/authMiddleware';
import {checkRole} from '../middleware/roleMiddleware';
import {upload} from '../middleware/uploadMiddleware';

const router = express.Router();

// 🔓 Lecture publique
router.get('/', getHeroes);
router.get('/:id', getHeroById);

// 🔐 Création et modification (admin + editor)
router.post('/', verifyToken, checkRole(['admin', 'editor']), upload.single('image'), createHero);
router.put('/:id', verifyToken, checkRole(['admin', 'editor']), upload.single('image'), updateHero);

// 🔐 Suppression (admin uniquement)
router.delete('/:id', verifyToken, checkRole(['admin']), deleteHero);

export default router;