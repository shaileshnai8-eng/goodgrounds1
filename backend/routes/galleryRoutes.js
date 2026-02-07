import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', protect, upload.single('image'), addGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
