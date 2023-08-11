const Message = require('../database/models/messages');

// Get all messages between a sender and a receiver
const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.findAll({
      where: {
        [sequelize.Op.or]: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get Messages Error:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { content, senderId, receiverId } = req.body;

    const message = await Message.create({
      content,
      senderId,
      receiverId,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Create Message Error:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
