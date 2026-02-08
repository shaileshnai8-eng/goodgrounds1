import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, upload.single('image'), addProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
