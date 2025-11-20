import express from 'express';
import {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
} from '../controllers/heroController';
import { checkRole } from '../middleware/roleMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// 🔓 Lecture publique
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);

// 🆕 Création (admin + editor)
router.post('/', checkRole(['admin', 'editor']), upload.single('image'), createHero);

// ✏️ Modification (admin + editor)
router.put('/:id', checkRole(['admin', 'editor']), upload.single('image'), updateHero);

// 🗑️ Suppression (admin uniquement)
router.delete('/:id', checkRole(['admin']), deleteHero);

export default router;
