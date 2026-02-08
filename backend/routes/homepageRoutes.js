import express from 'express';
import { getHomepageContent, updateHomepageContent } from '../controllers/homepageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHomepageContent);
router.put('/', protect, updateHomepageContent);

export default router;
