import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initial admin creation (if no admin exists)
const createInitialAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({});
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { username, password } = req.body;
        const admin = await Admin.create({
            username,
            password
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { loginAdmin, createInitialAdmin };
