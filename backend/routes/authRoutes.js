import express from 'express';
import { loginAdmin, createInitialAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/setup', createInitialAdmin);

export default router;
