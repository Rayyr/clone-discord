const serverStore = require("../serverStore.js");
const Message = require("../models/message.js");

const readMessagesHandler = async (socket, io, data) => {
  const { senderUserId } = data;
  const readerUserId = socket.user.userId;

  if (!senderUserId) {
    return;
  }

  const unreadMessages = await Message.find({
    senderUserId,
    receiverUserId: readerUserId,
    isRead: false,
  });

  if (unreadMessages.length === 0) {
    return;
  }

  const messageIds = unreadMessages.map((message) => message._id);
  const readAt = new Date();

  await Message.updateMany(
    { _id: { $in: messageIds } },
    { isRead: true, readAt }
  );

  const payload = {
    readerUserId,
    messageIds: messageIds.map((id) => id.toString()),
    readAt,
  };

  serverStore.getActiveConnections({ userId: senderUserId }).forEach((socketId) => {
    io.to(socketId).emit("messages-read", payload);
  });

  socket.emit("messages-read", payload);
};

module.exports = readMessagesHandler;
