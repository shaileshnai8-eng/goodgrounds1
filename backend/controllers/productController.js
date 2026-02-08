import Product from '../models/Product.js';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return defaultValue;
};

const parseNumber = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active !== undefined) {
      filter.isActive = req.query.active === 'true';
    }

    const products = await Product.find(filter).sort({ sortOrder: 1, createdAt: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const name = req.body.name?.trim();
  const category = req.body.category?.trim();
  const price = parseNumber(req.body.price);
  const sortOrder = parseNumber(req.body.sortOrder) ?? 0;
  const isActive = parseBoolean(req.body.isActive, true);
  const imageUrl = req.file?.path || req.body.imageUrl?.trim();

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (price === undefined) {
    return res.status(400).json({ message: 'Price must be a valid number' });
  }
  if (!isNonEmptyString(category)) {
    return res.status(400).json({ message: 'Category is required' });
  }
  if (!isNonEmptyString(imageUrl)) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const product = await Product.create({
      name,
      price,
      category,
      imageUrl,
      isActive,
      sortOrder,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.name !== undefined) {
      if (!isNonEmptyString(req.body.name)) {
        return res.status(400).json({ message: 'Name cannot be empty' });
      }
      product.name = req.body.name.trim();
    }

    if (req.body.price !== undefined) {
      const price = parseNumber(req.body.price);
      if (price === undefined) {
        return res.status(400).json({ message: 'Price must be a valid number' });
      }
      product.price = price;
    }

    if (req.body.category !== undefined) {
      if (!isNonEmptyString(req.body.category)) {
        return res.status(400).json({ message: 'Category cannot be empty' });
      }
      product.category = req.body.category.trim();
    }

    if (req.body.sortOrder !== undefined) {
      const sortOrder = parseNumber(req.body.sortOrder);
      if (sortOrder === undefined) {
        return res.status(400).json({ message: 'Sort order must be a valid number' });
      }
      product.sortOrder = sortOrder;
    }

    if (req.body.isActive !== undefined) {
      product.isActive = parseBoolean(req.body.isActive, product.isActive);
    }

    if (req.file?.path) {
      product.imageUrl = req.file.path;
    } else if (req.body.imageUrl !== undefined) {
      if (!isNonEmptyString(req.body.imageUrl)) {
        return res.status(400).json({ message: 'Image URL cannot be empty' });
      }
      product.imageUrl = req.body.imageUrl.trim();
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
