import mongoose from 'mongoose';

const cafeSettingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Good Grounds Cafe',
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  openingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
  },
  contactEmail: String,
  contactPhone: String,
}, { timestamps: true });

export default mongoose.model('CafeSettings', cafeSettingsSchema);
