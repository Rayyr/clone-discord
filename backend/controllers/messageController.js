const Message = require("../models/message.js");
const serverStore = require("../serverStore.js");
const mongoose = require("mongoose");

const formatMessage = (message) => ({
  id: message._id.toString(),
  senderUserId: message.senderUserId.toString(),
  receiverUserId: message.receiverUserId.toString(),
  content: message.content,
  date: message.createdAt,
  isRead: message.isRead,
  readAt: message.readAt,
});

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

    const unreadMessageIds = messages
      .filter((message) =>
        message.senderUserId.toString() === receiverUserId &&
        message.receiverUserId.toString() === userId &&
        !message.isRead
      )
      .map((message) => message._id);

    if (unreadMessageIds.length > 0) {
      const readAt = new Date();

      await Message.updateMany(
        { _id: { $in: unreadMessageIds } },
        { isRead: true, readAt }
      );

      messages.forEach((message) => {
        if (unreadMessageIds.some((id) => id.equals(message._id))) {
          message.isRead = true;
          message.readAt = readAt;
        }
      });

      const senderSockets = serverStore.getActiveConnections({
        userId: receiverUserId,
      });

      senderSockets.forEach((socketId) => {
        serverStore.getSocketServerInstance()?.to(socketId).emit("messages-read", {
          readerUserId: userId,
          messageIds: unreadMessageIds.map((id) => id.toString()),
          readAt,
        });
      });
    }

    return res.status(200).json({
      messages: messages.map(formatMessage),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const getUnreadMessages = async (req, res) => {
  try {
    const { userId } = req.user;

    const unreadMessages = await Message.aggregate([
      {
        $match: {
          receiverUserId: new mongoose.Types.ObjectId(userId),
          isRead: false,
        },
      },
      {
        $group: {
          _id: "$senderUserId",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      unreadMessages: unreadMessages.reduce((result, item) => ({
        ...result,
        [item._id.toString()]: item.count,
      }), {}),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

module.exports = {
  getDirectMessagesHistory,
  getUnreadMessages,
};
