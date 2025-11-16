import express from 'express';
import {
  registerUser,
  loginUser,
  verifyUserToken
} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUserToken);

export default router;
