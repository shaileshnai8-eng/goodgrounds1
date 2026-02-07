import MenuItem from '../models/MenuItem.js';
import { cloudinary } from '../config/cloudinary.js';

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image: req.file ? {
        url: req.file.path,
        public_id: req.file.filename,
      } : undefined,
    });

    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, isAvailable } = req.body;

  try {
    const menuItem = await MenuItem.findById(id);

    if (menuItem) {
      menuItem.name = name || menuItem.name;
      menuItem.description = description || menuItem.description;
      menuItem.price = price || menuItem.price;
      menuItem.category = category || menuItem.category;
      menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

      if (req.file) {
        // Delete old image if exists
        if (menuItem.image && menuItem.image.public_id) {
          await cloudinary.uploader.destroy(menuItem.image.public_id);
        }
        menuItem.image = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      const updatedMenuItem = await menuItem.save();
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);

    if (menuItem) {
      if (menuItem.image && menuItem.image.public_id) {
        await cloudinary.uploader.destroy(menuItem.image.public_id);
      }
      await menuItem.deleteOne();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem };
