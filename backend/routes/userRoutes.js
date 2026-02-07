import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userAuthController.js';
import { protectUser } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectUser, getUserProfile);

export default router;
