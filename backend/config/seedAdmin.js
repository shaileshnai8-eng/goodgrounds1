import Admin from '../models/Admin.js';

const seedAdminFromEnv = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return;
  }

  const existingAdmin = await Admin.findOne({});
  if (existingAdmin) {
    return;
  }

  await Admin.create({ username, password });
  console.log('Initial admin account created');
};

export default seedAdminFromEnv;
