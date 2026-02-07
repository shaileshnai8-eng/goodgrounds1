import GalleryImage from '../models/GalleryImage.js';
import { cloudinary } from '../config/cloudinary.js';

const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const galleryImage = new GalleryImage({
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      caption: req.body.caption,
    });

    const createdImage = await galleryImage.save();
    res.status(201).json(createdImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;

  try {
    const galleryImage = await GalleryImage.findById(id);

    if (galleryImage) {
      await cloudinary.uploader.destroy(galleryImage.image.public_id);
      await galleryImage.deleteOne();
      res.json({ message: 'Image removed' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getGalleryImages, addGalleryImage, deleteGalleryImage };
