import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Drinks', 'Snacks'],
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
