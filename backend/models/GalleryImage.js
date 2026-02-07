import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  caption: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('GalleryImage', galleryImageSchema);
