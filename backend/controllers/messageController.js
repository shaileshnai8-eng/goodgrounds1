import ContactMessage from '../models/ContactMessage.js';

const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    const savedMessage = await contactMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await ContactMessage.findById(id);

    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            message.isRead = true;
            await message.save();
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getMessages, sendMessage, deleteMessage, markAsRead };
