const Message = require("../models/message.js");

const getDirectMessagesHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    const { receiverUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderUserId: userId, receiverUserId },
        { senderUserId: receiverUserId, receiverUserId: userId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      messages: messages.map((message) => ({
        id: message._id,
        senderUserId: message.senderUserId.toString(),
        receiverUserId: message.receiverUserId.toString(),
        content: message.content,
        date: message.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

module.exports = {
  getDirectMessagesHistory,
};
