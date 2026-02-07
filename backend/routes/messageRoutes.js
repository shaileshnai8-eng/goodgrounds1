import express from 'express';
import { getMessages, sendMessage, deleteMessage, markAsRead } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMessages);
router.post('/', sendMessage);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

export default router;
