import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
