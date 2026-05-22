const serverStore = require("../serverStore.js");
const Message = require("../models/message.js");

const directMessageHandler = async (socket, io, data) => {
  const { receiverUserId, content } = data;

  if (!receiverUserId || !content) {
    return;
  }

  const senderUserId = socket.user.userId;
  const savedMessage = await Message.create({
    senderUserId,
    receiverUserId,
    content,
  });

  const message = {
    id: savedMessage._id.toString(),
    senderUserId,
    receiverUserId,
    content,
    date: savedMessage.createdAt,
    isRead: savedMessage.isRead,
    readAt: savedMessage.readAt,
  };

  const receiverSockets = serverStore.getActiveConnections({
    userId: receiverUserId,
  });

  receiverSockets.forEach((socketId) => {
    io.to(socketId).emit("direct-message", message);
  });

  socket.emit("direct-message", message);
};

module.exports = directMessageHandler;
