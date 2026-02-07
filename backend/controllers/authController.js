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
    const normalizedUsername = username?.trim();
    const admin = await Admin.findOne({ username: normalizedUsername });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      const envUsername = process.env.ADMIN_USERNAME?.trim();
      const envPassword = process.env.ADMIN_PASSWORD;
      const forceReset = process.env.ADMIN_FORCE_RESET === 'true';

      if (envUsername && envPassword && normalizedUsername === envUsername) {
        if (!admin && password === envPassword) {
          const seededAdmin = await Admin.create({
            username: envUsername,
            password: envPassword,
          });

          return res.json({
            _id: seededAdmin._id,
            username: seededAdmin.username,
            token: generateToken(seededAdmin._id),
          });
        }

        if (admin && forceReset && password === envPassword) {
          admin.password = envPassword;
          await admin.save();

          return res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
          });
        }
      }

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
