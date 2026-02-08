import HomepageContent from '../models/HomepageContent.js';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isValidLink = (value) => {
  if (!isNonEmptyString(value)) return false;
  return /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(value.trim());
};

const getHomepageContent = async (req, res) => {
  try {
    let content = await HomepageContent.findOne({});
    if (!content) {
      content = await HomepageContent.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHomepageContent = async (req, res) => {
  const {
    tagline,
    titlePart1,
    titlePart2,
    description,
    button1Text,
    button1Link,
    button2Text,
    button2Link,
    videoUrl,
    heroBgType,
    heroBgUrl,
  } = req.body;

  if (!isNonEmptyString(tagline)) {
    return res.status(400).json({ message: 'Tagline is required' });
  }
  if (!isNonEmptyString(titlePart1)) {
    return res.status(400).json({ message: 'Title part 1 is required' });
  }
  if (!isNonEmptyString(titlePart2)) {
    return res.status(400).json({ message: 'Title part 2 is required' });
  }
  if (!isNonEmptyString(description)) {
    return res.status(400).json({ message: 'Description is required' });
  }
  if (!isNonEmptyString(button1Text)) {
    return res.status(400).json({ message: 'Button 1 text is required' });
  }
  if (!isNonEmptyString(button1Link) || !isValidLink(button1Link)) {
    return res.status(400).json({ message: 'Button 1 link must be a valid URL or anchor' });
  }
  if (!isNonEmptyString(button2Text)) {
    return res.status(400).json({ message: 'Button 2 text is required' });
  }

  const normalizedButton2Link = typeof button2Link === 'string' ? button2Link.trim() : '';
  if (normalizedButton2Link && !isValidLink(normalizedButton2Link)) {
    return res.status(400).json({ message: 'Button 2 link must be a valid URL or anchor' });
  }

  const normalizedVideoUrl = typeof videoUrl === 'string' ? videoUrl.trim() : '';
  if (normalizedVideoUrl && !isValidLink(normalizedVideoUrl)) {
    return res.status(400).json({ message: 'Video URL must be a valid URL' });
  }

  const normalizedHeroBgUrl = typeof heroBgUrl === 'string' ? heroBgUrl.trim() : '';
  if (normalizedHeroBgUrl && !isValidLink(normalizedHeroBgUrl)) {
    return res.status(400).json({ message: 'Hero background URL must be a valid URL' });
  }

  if (heroBgType && !['image', 'video'].includes(heroBgType)) {
    return res.status(400).json({ message: 'Hero background type must be image or video' });
  }

  try {
    let content = await HomepageContent.findOne({});
    if (!content) {
      content = await HomepageContent.create({});
    }

    content.tagline = tagline.trim();
    content.titlePart1 = titlePart1.trim();
    content.titlePart2 = titlePart2.trim();
    content.description = description.trim();
    content.button1Text = button1Text.trim();
    content.button1Link = button1Link.trim();
    content.button2Text = button2Text.trim();
    content.button2Link = normalizedButton2Link;
    content.videoUrl = normalizedVideoUrl;
    content.heroBgType = heroBgType || content.heroBgType;
    content.heroBgUrl = normalizedHeroBgUrl;

    const updated = await content.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getHomepageContent, updateHomepageContent };
