import mongoose from 'mongoose';

const homepageContentSchema = new mongoose.Schema(
  {
    tagline: {
      type: String,
      required: true,
      default: 'Cleveland-based Coffee shop',
    },
    titlePart1: {
      type: String,
      required: true,
      default: 'GOOD',
    },
    titlePart2: {
      type: String,
      required: true,
      default: 'Grounds|Coffee & Bistro',
    },
    description: {
      type: String,
      required: true,
      default:
        'Did you know that your next favorite coffee may be hiding in plain sight?\nTake our quiz to get matched with the perfect beans for you.',
    },
    button1Text: {
      type: String,
      required: true,
      default: 'Out Products',
    },
    button1Link: {
      type: String,
      required: true,
      default: '#products',
    },
    button2Text: {
      type: String,
      required: true,
      default: 'Watch Video',
    },
    button2Link: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    heroBgType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    heroBgUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('HomepageContent', homepageContentSchema);
