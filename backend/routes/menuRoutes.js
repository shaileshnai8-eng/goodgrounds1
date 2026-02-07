import express from 'express';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', protect, upload.single('image'), addMenuItem);
router.put('/:id', protect, upload.single('image'), updateMenuItem);
router.delete('/:id', protect, deleteMenuItem);

export default router;
