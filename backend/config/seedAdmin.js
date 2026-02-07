import Admin from '../models/Admin.js';

const seedAdminFromEnv = async () => {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const forceReset = process.env.ADMIN_FORCE_RESET === 'true';

  if (!username || !password) {
    return;
  }

  try {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      if (!forceReset) {
        return;
      }

      existingAdmin.username = username;
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log('Admin credentials reset from env');
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
