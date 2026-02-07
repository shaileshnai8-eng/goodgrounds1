import Admin from '../models/Admin.js';

const seedAdminFromEnv = async () => {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return;
  }

  try {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return;
    }

    await Admin.create({ username, password });
    console.log('Initial admin account created');
  } catch (error) {
    if (error?.code === 11000) {
      console.log('Admin already exists');
      return;
    }
    console.error('Admin seed failed:', error.message || error);
  }
};

export default seedAdminFromEnv;
