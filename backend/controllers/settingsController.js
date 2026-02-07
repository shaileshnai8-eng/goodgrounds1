import CafeSettings from '../models/CafeSettings.js';

const getSettings = async (req, res) => {
  try {
    let settings = await CafeSettings.findOne({});
    if (!settings) {
      settings = await CafeSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await CafeSettings.findOne({});
    if (settings) {
      settings.name = req.body.name || settings.name;
      settings.description = req.body.description || settings.description;
      settings.address = req.body.address || settings.address;
      settings.openingHours = req.body.openingHours || settings.openingHours;
      settings.socialMedia = req.body.socialMedia || settings.socialMedia;
      settings.contactEmail = req.body.contactEmail || settings.contactEmail;
      settings.contactPhone = req.body.contactPhone || settings.contactPhone;

      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      const newSettings = await CafeSettings.create(req.body);
      res.json(newSettings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSettings, updateSettings };
